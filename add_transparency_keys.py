import json

keys = {
  "en": {
    "calculator_summary": "Your calculation stays on your device unless you are logged in.",
    "calculator_detail1": "Results are saved to your browser only, not our servers, unless you have an account.",
    "calculator_detail2": "If you log in, calculation history is used to personalise your feed recommendations.",
    "calculator_detail3": "We never share individual farm data with third parties.",
    "calculator_detail4": "You can delete your history any time from your profile.",
    "signup_summary": "We collect only what is needed to create your account.",
    "signup_detail1": "Email: used only for login and important account notifications.",
    "signup_detail2": "Password: stored as a secure hash — we cannot read it.",
    "signup_detail3": "Farm details are optional and used only to personalise feed recommendations.",
    "signup_detail4": "We do not sell your data or use it for advertising.",
    "hide": "Hide details",
    "show": "How we use this",
    "policy_link": "Read the full Privacy Policy"
  },
  "yo": {
    "calculator_summary": "Iṣiro rẹ wa lori ẹrọ rẹ ayafi ti o ba wọle si akọọlẹ.",
    "calculator_detail1": "Awọn abajade ti fipamọ ninu aṣàwákiri rẹ nikan, kii ṣe awọn olupin wa, ayafi ti o ba ni akọọlẹ.",
    "calculator_detail2": "Ti o ba wọle, itan iṣiro n ṣe iranlọwọ lati ṣe aṣa awọn iṣeduro ounjẹ rẹ.",
    "calculator_detail3": "A ko pin data oko kọọkan pẹlu awọn ẹgbẹ kẹta.",
    "calculator_detail4": "O le pa itan rẹ rẹ nigbakugba lati profaili rẹ.",
    "signup_summary": "A gba nikan ohun ti o nilo lati ṣẹda akọọlẹ rẹ.",
    "signup_detail1": "Imeeli: a lo nikan fun iwọle ati awọn ifitonileti akọọlẹ pataki.",
    "signup_detail2": "Ọrọigbaniwọle: ti fipamọ bi hash ti o ni aabo — a ko le ka rẹ.",
    "signup_detail3": "Awọn alaye oko jẹ aṣayan ati lo nikan lati ṣe aṣa awọn iṣeduro ounjẹ.",
    "signup_detail4": "A ko ta data rẹ tabi lo fun ipolowo.",
    "hide": "Fi pamọ",
    "show": "Bii a ṣe n lo eyi",
    "policy_link": "Ka Eto Asiri ni kikun"
  },
  "ha": {
    "calculator_summary": "Ƙididdigar ka tana kan na'urarka sai dai idan ka shiga.",
    "calculator_detail1": "Ana adana sakamakon a cikin mai bincike ka kawai, ba a sabobin mu ba.",
    "calculator_detail2": "Idan ka shiga, ana amfani da tarihin ƙididdigewa don keɓance shawarwarin abincin ka.",
    "calculator_detail3": "Ba ma raba bayanin gona ɗaya ɗaya da ɓangarori na uku.",
    "calculator_detail4": "Zaka iya share tarihin ka a kowane lokaci daga bayanan ka.",
    "signup_summary": "Muna tattara abin da ake buƙata kawai don ƙirƙira asusun ka.",
    "signup_detail1": "Imel: ana amfani da shi kawai don shiga da sanarwar asusu masu mahimmanci.",
    "signup_detail2": "Kalmar sirri: ana adana ta a matsayin hash mai aminci — ba za mu iya karantawa ba.",
    "signup_detail3": "Cikakkun bayanan gona zaɓi ne kuma ana amfani da su kawai don keɓance shawarwarin abinci.",
    "signup_detail4": "Ba ma sayar da bayananku ko amfani da su don talla.",
    "hide": "Boye bayani",
    "show": "Yadda muke amfani da wannan",
    "policy_link": "Karanta cikakkiyar Manufar Sirri"
  },
  "ig": {
    "calculator_summary": "Ọgụgụ gị nọ na ngwaọrụ gị naanị ma ọ bụrụhà na ịbanye.",
    "calculator_detail1": "Nsonaazụ echebara na ihe nchọgharị gị naanị, ọ bụghị sava anyị.",
    "calculator_detail2": "Ọ bụ na ị banye, ana eji akụkọ ọgụgụ hazi ndụmọdụ nri gị.",
    "calculator_detail3": "Anyị anaghị ekekọrịta data ugbo ọ bụla na ndị ọzọ n'èzí.",
    "calculator_detail4": "Ị nwere ike ihichapụ akụkọ gị mgbe ọ bụla site na profaịlụ gị.",
    "signup_summary": "Anyị na-achịkọta naanị ihe achọrọ iji mepụta akaụntụ gị.",
    "signup_detail1": "Imeyi: a na-eji ya naanị maka ịbanye na ọkwa akaụntụ dị mkpa.",
    "signup_detail2": "Paswọọdụ: echebara dị ka hash nchekwa — anyị enweghị ike ịgụ ya.",
    "signup_detail3": "Nkọwa ugbo bụ nhọrọ ma a na-eji ya naanị iji hazi ndụmọdụ nri.",
    "signup_detail4": "Anyị anaghị ere data gị ma ọ bụ eji ya maka mgbasa ozi.",
    "hide": "Zobe ihe omume",
    "show": "Otu anyị si eji nke a",
    "policy_link": "Gụọ Iwu Nzuzo zuru ezu"
  }
}

for lang in ['en', 'yo', 'ha', 'ig']:
    path = f'src/locales/{lang}.json'
    with open(path, 'r') as f:
        data = json.load(f)
    data['transparency'] = keys[lang]
    with open(path, 'w') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'Updated {lang}.json')
print('All done')
