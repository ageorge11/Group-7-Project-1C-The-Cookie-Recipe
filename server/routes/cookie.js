const db = require('../db');

exports.get = async (req, res) => {
    console.log("get All Cookies : "+JSON.stringify(req.body));
    cookies = await db.getAllCookie()

    res.status(200).json({
        "cookies": cookies
    });

}

exports.add = async (req, res) => {
    console.log("Adding Cookie"+JSON.stringify(req.body));

    const { recipe_name, recipe_desc, user_id } = req.body;
    await db.addCookie(req.body);
    res.status(201).json({
        "message:": "Cookie Added"
    });

}

exports.getRating = async (req, res) => {
   // console.log("Get Rating : "+JSON.stringify(req.body));
    const { recipe_id, type } = req.body;
    result1 = await db.getRating(recipe_id, "like");
    result2 = await db.getRating(recipe_id, "dislike");

    //console.log(result1);
    //console.log(result1[0].rating);

    var rating = {
        "like": result1[0].rating,
        "dislike": result2[0].rating
    };

    if (result1) {
        res.status(200).json({
            rating
        });
    }
    else {

    }
    // console.log(result);

}

exports.comment = async (req, res) => {
    console.log(JSON.stringify(req.body));

}

exports.rate = async (req, res) => {
    console.log(JSON.stringify(req.body));

}

exports.search = async (req, res) => {
    console.log(JSON.stringify(req.body));

}

