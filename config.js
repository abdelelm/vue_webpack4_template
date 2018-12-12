var currentLanguage = process.env.BUILD_LANGUAGE || "en"
var languages = {
	"en": {
		filename: "en",
		fallback: null
	},
	"fr": {
		filename: "fr",
		fallback: "en"
	},
	"nl": {
		filename: "nl",
		fallback: "en"
	}
}

if (!languages[currentLanguage]) {
	throw new Error("Undefined language: " + currentLanguage)
}

var language = languages[currentLanguage];
var fallbackLanguage = languages[language.fallback] || null;
var nodeEnv = process.env.NODE_ENV || "development";

module.exports = {
	language: language,
	fallbackLanguage: fallbackLanguage,
	nodeEnv: nodeEnv,
	PROD: nodeEnv === "production",
	DEV : nodeEnv === "development" || nodeEnv === "developpment",
	ssr : false,
	public_folder : "dist",
	website : {
		name : "Vue_webpack4.0",
		title : "Vue_webpack4.0",
		description : "Vue_webpack4.0",
		keywords : "Vue_webpack4.0",
		favicon : __dirname + "/src/logo.png"
	}
}