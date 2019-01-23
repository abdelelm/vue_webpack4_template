const language_config = require("./languages");
var nodeEnv = process.env.NODE_ENV || "development";
if(!process.env.NODE_ENV)
	process.env.NODE_ENV = nodeEnv;
	
module.exports = {
	language_key : language_config.main_language_key,
	translations : language_config.languages,
	language: language_config.main_language,
	fallbackLanguage:  language_config.main_fallback,
	nodeEnv: nodeEnv,
	PROD: nodeEnv === "production",
	DEV : nodeEnv === "development",
	service_worker : true,
	public_folder : "wwwroot",
	website : {
		name_split : [ "Test" , "Monitoring"],
		name : "FoodMonitoring",
        title: "FoodMonitoring",
		description : "Webapp for food monitoring",
		keywords : "food , monitoring , scientist",
		favicon : __dirname + "/src/images/logo.png"
	}
}
