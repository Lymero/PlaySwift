const express = require("express");
const router = express.Router();
const { pool } = require("../modules/db");

router.get("/me/playlists", async (req, res, next) => {
  const client = await pool.connect();
  const query = `select pl1.id_playlist,
  pl1.name,
  pl1.id_tag,
  pl1.visible,
  pl1.id_user,
  pl1.creation_date,
  pl1.last_update_date,
  pl1.description,
  pl1.likes_number,
  pl1.dislikes_number, 
ta.tag_name,
  v.url_thumbnail
from playswift.playlists pl1
join playswift.videos_playlists vp on vp.id_playlist=pl1.id_playlist
join playswift.videos v on vp.id_video=v.id_video
join playswift.tags ta on pl1.id_tag=ta.id_tag 
where pl1.id_user = $1
group by pl1.id_playlist, v.url_thumbnail, vp.position, ta.tag_name
having vp.position=(
  select min(position)
  from playswift.videos_playlists pl2
  where pl1.id_playlist=pl2.id_playlist
)
union
select pl.*, ta.tag_name, null from playswift.playlists pl
join playswift.tags ta on pl.id_tag = ta.id_tag
where pl.id_user = $1 and pl.id_playlist not in (select id_playlist from playswift.videos_playlists)`;
  const values = [req.body.id_user];
  try {
    const result = await client.query(query, values);
    res.send(result.rows);
  } catch (err) {
    return next(err);
  } finally {
    client.release();
  }
});

router.get("/me/subscriptions", async (req, res, next) => {
  const client = await pool.connect();
  const query = `select * from playswift.subscriptions where id_user = $1 order by id_tag`;
  const values = [req.body.id_user];
  try {
    const result = await client.query(query, values);
    res.send(result.rows);
  } catch (err) {
    return next(err);
  } finally {
    client.release();
  }
});

router.post("/me/subscriptions", async (req, res, next) => {
  const client = await pool.connect();
  const query = `insert into playswift.subscriptions values(default, $1,$2) returning *`;
  const values = [req.body.id_tag, req.body.id_user];
  try {
    const result = await client.query(query, values);
    res.send(result.rows[0]);
  } catch (err) {
    return next(err);
  } finally {
    client.release();
  }
});

module.exports = router;
