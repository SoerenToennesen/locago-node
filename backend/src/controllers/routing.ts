import express from "express";

export const computeRoute = async (req: express.Request, res: express.Response) => {
    try {
        const { vehicles, operators, demandAreas } = req.params;

        return res.status(200).json("");
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}