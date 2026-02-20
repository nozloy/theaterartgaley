import { TeamMember } from '@/types/team'
import alexanderGalimovAvatar from '@/public/images/avatars/alexander_galimov.png'
import devyatovaEkaterinaAvatar from '@/public/images/avatars/devyatova_ekaterina.png'
import artemLulinAvatar from '@/public/images/avatars/artem_lulin.png'
import fanzilFattakhovAvatar from '@/public/images/avatars/fanzil_fattakhov.png'
import vladimirTsigvintsevAvatar from '@/public/images/avatars/vladimir_tsigvintsev.png'
import asyaDonmezAvatar from '@/public/images/avatars/asya_donmez.png'

export const teamMembers: TeamMember[] = [
	{
		id: 'alexander-galimov',
		name: 'Александр Галимов',
		roles: ['Режиссер', 'Актер'],
		experience: [
			'Опыт съёмок',
			'Участие в лаборатории Роберта Уилсона',
			'Спектакли: Мертвые души, Обрыв, Человек подушка',
			'Гран-при фестиваля Theatertreffen',
		],
		education: [],
		avatar: alexanderGalimovAvatar.src,
	},
	{
		id: 'devyatova-ekaterina',
		name: 'Девятова Екатерина',
		roles: ['Фотомодель', 'Актриса', 'Педагог'],
		experience: ['Съёмки в рекламе', 'Иммерсивный спектакль «ПАРА»'],
		education: [],
		avatar: devyatovaEkaterinaAvatar.src,
	},
	{
		id: 'artyom-lyulin',
		name: 'Артём Люлин',
		roles: ['Актер'],
		experience: ['Актёр Театра Юного Зрителя', 'Реклама, кино, спектакли'],
		education: [
			'Выпускник Казанского театрального училища',
			'Мастерская Т.В. Лядовой',
		],
		avatar: artemLulinAvatar.src,
	},
	{
		id: 'fanzil-fattakhov',
		name: 'Фанзиль Фаттахов',
		roles: ['Актёр'],
		experience: [
			'Камерный театр',
			'Короткометражные фильмы',
			'Спектакли: Сон в летнюю ночь, Падение в Аид, Изнанка стиральной машинки',
		],
		education: [],
		avatar: fanzilFattakhovAvatar.src,
	},
	{
		id: 'vladimir-tsigvintsev',
		name: 'Владимир Цигвинцев',
		roles: ['Актер'],
		experience: [
			'Патруль (2011, Макаров)',
			'Смерч (2012, 27 серия, Диггер №1)',
			'Посредник (2013, полицейский Мурзенко)',
			'Гонимый солями (2014, главная роль Радмир)',
			'Сын (2014, короткометражка, главная роль)',
			'Ромео и Джульетта — Бенволио (дипломный спектакль)',
			'Дочки матери — Резо',
			'Театр Андрея Фартушного (с 2016, Москва)',
			"Канал Теледом — ведущий 'Секреты профессора Открывашкина'",
			'Тайны следствия (2016, Прутов)',
			'Фотография (2018, Иван)',
			'Тайны следствия (2019, Шохин)',
			'Крепкие орешки (2019, Макаров)',
			'Свои (2020, Крохмалев)',
			'Великолепная пятерка (2020, Миша)',
		],
		education: ['2011 — окончил курс ЗА России Самочко Михаила Ивановича'],
		avatar: vladimirTsigvintsevAvatar.src,
	},
	{
		id: 'asya-donmez',
		name: 'Ася Донмез',
		roles: ['Актриса', 'Фотомодель'],
		experience: ['Спектакли Анталийских театров', 'Реклама'],
		education: [],
		avatar: asyaDonmezAvatar.src,
	},
]
