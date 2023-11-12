import RequestModel from '../models/Request.js';

export const createRequest = async (req, res) => {
	try {
		const doc = new RequestModel({
			title: req.body.title,
			text: req.body.text,
			category: req.body.category,
			user: req.userId,
		});

		const request = await doc.save();

		res.status(201).json({
			...request,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Створити запис не вдалось',
		});
	}
};

export const getAllRequests = async (req, res) => {
	try {
		const requests = await RequestModel.find().sort({createdAt: -1}).populate('user', '-passwordHash').exec();
		res.json(requests);
	} catch (error) {
		res.status(500).json({
			message: `Не вийшло отримати всі статті ${error}`,
		});
	}
};

export const getOneRequest = async (req, res) => {
	try {
		const requestId = req.params.id;

        RequestModel.findOneAndUpdate({_id:requestId}, {$inc: {viewsCount: 1}}, {returnDocument: 'after'}).populate('user').exec().then((doc) => {
            if(!doc) {
                return res.status(404).json({
                    message: 'Запит не знайдено',
                });
            }
            res.json(doc);
        })
	} catch (error) {
		res.status(500).json({
			message: `Не вийшло отримати статтю ${error}`,
		});
	}
};

export const deleteOneRequest = async (req, res) => {
    try {
        const requestId = req.params.id;

        RequestModel.findOneAndDelete({_id:requestId}).exec().then((doc) => {
            if(!doc) {
                return res.status(404).json({
                    message: 'Запиту не знайдено',
                });
            }
            res.json({
                success: true
            });
        })
    } catch(err) {
        res.status(500).json({
            message: `Не вийшло видалити статтю ${error}`,
        });
    }
}

export const updateRequest = async (req, res) => {
    try {
        const requestId = req.params.id;
        await RequestModel.updateOne({
            _id: requestId
        },
        {
            title: req.body.title,
            text: req.body.text,
            category: req.body.category
        })
        res.json({
            success: true,  
        })
    } catch (error) {
        res.status(500).json({
            message: `Не вийшло оновити статтю ${error}`,
        });
    }
}