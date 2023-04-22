import { Ref } from 'vue'

export type Language = 'en' | 'ja'

// 日本語説明
const description_ja = {
  max: '最高温度',
  min: '最低温度',
  wind: {
    speed: '風速',
    degree: '風向',
  },
	humidity: '湿度',
	pressure: '気圧'
}

// 英語説明
const description_en = {
  max: 'max temperature',
  min: 'min temperature',
  wind: {
    speed: 'wind speed',
    degree: 'wind degree',
  },
	humidity: 'humidity',
	pressure: 'pressure'
}


export const useLang = () => {
	const language: Ref<Language> = useState(
		'useLang.lang', () => {
			return 'en'
		}
	)

	const description: Ref<any> = useState(
		'useLang.description', () => {
			return description_en
		}
	)

	const setLang = (lang: Language) => {
		language.value = lang
		description.value = lang === 'en' ? description_en : description_ja
	}

	return {
		description,
		setLang
	}
}
