//Generates HTML for all the languages in languageObject.js from the instance created as a global var in picterpret.js
function createLanguageList(leftRight){
    let string = "";
    Object.entries(languageObjectInstance).forEach(
        ([key, value]) => {
            string += (
                "<div id='"
                + key.toString()+ "MenuItemContainer" + leftRight + "' class='menuItemContainer'" + " onClick='selectLanguage(" +
                ((leftRight=="Left") ? 0:1 ).toString() + ", \"" + key.toString() + "\")'" + ">"
                + "\n    <div id='"
                + key.toString()+ "MenuItem" + leftRight + "' class='menuItem'>"
                + "" +value[0]
                + "</div>\n"
                + "</div>\n");
        });
    return string;
}