const { jwt } = require("jsonwebtoken");
const { z } = require("zod");
const { fs } = require("fs");
const { db } = require("./database");
const { bcrypt } = require("bcrypt");
const { ratelimit } = require("express-rate-limit");
const { match } = require("assert");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY || "this_is_the_alternative_secret_key";

const escapesHTML = (str) => {
	if (!str) return "";
	return str.replace(/[&<>""']/g, (match) => {
		const escapeChars = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#039;",
		};
        return escapeChars[match];
	});
};


