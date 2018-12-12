const express = require("express");
const router = express.Router();
const { pool } = require("../modules/db");

router.delete("/:id_tag", async (req, res, next) => {
    const client = await pool.connect();
    const deleteSubscription = `delete from playswift.subscriptions where id_tag = $1 and id_user = $2 returning *`;
    const values = [req.params.id_tag, req.body.id_user];
    try {
        const result = await client.query(deleteSubscription, values);
        res.send(result.rows);
    } catch (err) {
        return next(err);
    } finally {
        client.release();
    }
});

module.exports = router;
