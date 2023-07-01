import express, { Request } from "express";
import * as db from "zapatos/db";
import type * as s from "zapatos/schema";
import pool from "../pool";

const userRouter = express.Router();

userRouter
	.route("/")
	.get(async (req, res) => {
		const users = await db.sql<s.User.SQL, s.User.Selectable[]>`
		SELECT * FROM ${"User"}`.run(pool);
		res.status(200).send(users);
	})
	.put(
		async (
			req: Request<{}, {}, { id?: number; email: string }, {}>,
			res
		) => {
			const { body } = req;
			const { id, email } = body;

			let user: s.User.JSONSelectable | undefined;
			if (id) {
				user = (
					await db
						.update(
							"User",
							{
								email: email,
								updated_at: new Date(),
							},
							{
								user_id: Number(id),
							}
						)
						.run(pool)
				)[0];
			} else {
				user = await db
					.insert("User", {
						email: email,
						created_at: new Date(),
						updated_at: new Date(),
					})
					.run(pool);
			}
			res.status(200).send(user);
		}
	);

userRouter
	.route("/:id")
	.get(async (req: Request<{ id: string }, {}, {}, {}>, res) => {
		const { params } = req;
		const { id } = params;
		const users = await db
			.select("User", {
				user_id: Number(id),
			})
			.run(pool);
		res.status(200).send(users[0]);
	});

export default userRouter;
