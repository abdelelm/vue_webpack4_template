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
module.exports = {
	main_language :  languages[currentLanguage],
	main_language_key  : currentLanguage,
	main_fallback :   languages[languages[currentLanguage].fallback] || null,
	languages :languages
}