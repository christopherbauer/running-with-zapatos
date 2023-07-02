import express, { Request } from "express";
import * as db from "zapatos/db";
import type * as s from "zapatos/schema";
import pool from "../pool";

const productRouter = express.Router();

productRouter
	.route("/")
	.get(async (req, res) => {
		const products = await db.select("Product", {}).run(pool);
		res.status(200).send(products);
	})
	.put(
		async (
			req: Request<
				{},
				{},
				{
					id?: number;
					name: string;
					price: number;
					description: string;
				}[],
				{}
			>,
			res
		) => {
			const { body } = req;
			let products: s.Product.JSONSelectable[] = [];
			for (let i = 0; i < body.length; i++) {
				const product = body[i];
				const { id, name, price, description } = product;
				if (id) {
					products.push(
						...(await db
							.update(
								"Product",
								{
									name,
									price,
									description,
									updated_at: new Date(),
								},
								{
									product_id: Number(id),
								}
							)
							.run(pool))
					);
				} else {
					products.push(
						await db
							.insert("Product", {
								name,
								price,
								description,
								created_at: new Date(),
								updated_at: new Date(),
							})
							.run(pool)
					);
				}
			}

			res.status(200).send(products);
		}
	);

export default productRouter;
