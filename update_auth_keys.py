import json

extra = {'en': {'account_details': 'Account details', 'password_hint': 'Minimum 8 characters', 'farm_details_label': 'Farm details', 'farm_details_optional': 'Optional', 'farm_details_desc': 'Adding your farm details helps us personalise your recommendations. You can add these later from your profile.', 'farm_type_label': 'Farm type', 'birds_label': 'Number of birds', 'terms_agree': 'I have read and agree to the', 'terms_link': 'Terms and Conditions', 'and': 'and', 'privacy_link': 'Privacy Policy'}, 'yo': {'account_details': 'Awọn alaye akọọlẹ', 'password_hint': 'O kere ju awọn ohun kikọ 8', 'farm_details_label': 'Awọn alaye oko', 'farm_details_optional': 'Aṣayan', 'farm_details_desc': 'Fifi awọn alaye oko rẹ kun n ṣe iranlọwọ fun wa lati ṣe aṣa awọn iṣeduro rẹ. O le ṣafikun iwọnyi lẹhinna lati profaili rẹ.', 'farm_type_label': 'Iru oko', 'birds_label': 'Nọmba awọn eye', 'terms_agree': 'Mo ti ka ati gba si', 'terms_link': 'Awọn Ofin ati Ipo', 'and': 'ati', 'privacy_link': 'Eto Asiri'}, 'ha': {'account_details': 'Cikakkun bayanan asusu', 'password_hint': 'Akalla haruffa 8', 'farm_details_label': 'Cikakkun bayanan gona', 'farm_details_optional': 'Zaɓi', 'farm_details_desc': 'Ƙara cikakkun bayanan gonarka yana taimakon mu mu keɓance shawarwarinka. Zaka iya ƙarawa daga bayanan ka daga baya.', 'farm_type_label': "Nau'in gona", 'birds_label': 'Yawan tsuntsaye', 'terms_agree': 'Na karanta kuma na yarda da', 'terms_link': 'Sharuɗɗa da Yanayi', 'and': 'da', 'privacy_link': 'Manufar Sirri'}, 'ig': {'account_details': 'Nkọwa akaụntụ', 'password_hint': 'Ihe kacha nta mkpụrụedemede 8', 'farm_details_label': 'Nkọwa ugbo', 'farm_details_optional': 'Nhọrọ', 'farm_details_desc': 'Itinye nkọwa ugbo gị na-enye anyị aka ịhazi ndụmọdụ gị. Ị nwere ike itinye ha ka ọdịịcha site na profaịlụ gị.', 'farm_type_label': 'Ụdị ugbo', 'birds_label': 'Ọnụ ọgụgụ nnụnụ', 'terms_agree': 'Agụọla m ma ekwenyekwara na', 'terms_link': 'Usoro na Ọnọdụ', 'and': 'na', 'privacy_link': 'Iwu Nzuzo'}}

for lang in ['en', 'yo', 'ha', 'ig']:
    path = f'src/locales/{lang}.json'
    with open(path, 'r') as f:
        data = json.load(f)
    data['auth'].update(extra[lang])
    with open(path, 'w') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'Updated {lang}.json')
print('All done')
