'use client'

import {
	Fragment,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
	type ComponentType,
} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
	ArrowUpRight,
	CalendarDays,
	MapPin,
	Menu,
	MessageCircle,
	MousePointerClick,
	Phone,
	Ticket,
} from 'lucide-react'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { teamMembers } from '@/constants/team-members'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { EventData } from '@/lib/server-event'
import CookieConsent from '@/storage/CookieConsent'
import { Telegram } from '@/components/shared/icons/telegram'

const manrope = Manrope({
	subsets: ['latin', 'cyrillic'],
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-manrope',
})

const cormorant = Cormorant_Garamond({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700'],
	style: ['normal', 'italic'],
	variable: '--font-cormorant',
})

const monthToShort: Record<string, string> = {
	января: 'ЯНВ',
	февраля: 'ФЕВ',
	марта: 'МАР',
	апреля: 'АПР',
	мая: 'МАЙ',
	июня: 'ИЮН',
	июля: 'ИЮЛ',
	августа: 'АВГ',
	сентября: 'СЕН',
	октября: 'ОКТ',
	ноября: 'НОЯ',
	декабря: 'ДЕК',
}

const cityStories = [
	{
		id: 'kazan',
		city: 'Казань',
		image: '/images/kazan.png',
		since: 'С февраля 2024 года',
		description:
			'Современные арт-пространства и театральные залы для новой аудитории.',
		fullText:
			'В Казани театр АРТГалей открыл свой творческий сезон в феврале 2024 года. Казань — динамично развивающийся мегаполис, сочетающий богатое историческое прошлое и новейшие достижения современности. Здесь театр АРТГалей становится частью живой культурной среды города, где традиции встречаются с инновациями. Наши спектакли в Казани проходят в современных арт-пространствах и театральных залах, собирая поклонников театра, студентов, молодежь и всех, кто ценит оригинальные постановки. АРТГалей в Казани — это свежий взгляд на драматургию, актуальные темы и уникальный творческий подход, соответствующий ритму и духу современного города. Посетите наши спектакли в Казани, чтобы почувствовать энергетику и культурное разнообразие одного из самых ярких городов России!',
	},
	{
		id: 'antalya',
		city: 'Анталья',
		image: '/images/gates.png',
		since: 'С 2023 года',
		description:
			'Иммерсивные и камерные спектакли в уникальных пространствах города.',
		fullText:
			'В Анталье мы выступаем с 2023 года. Здесь проходят иммерсивные и камерные спектакли в уникальных пространствах города, объединяя местных жителей и гостей региона. Анталья — древний город с богатым культурным наследием, жемчужина Турецкой Ривьеры и один из центров театральной жизни Средиземноморья. Наши постановки в Анталье проходят в атмосферных исторических и современных локациях, позволяя зрителям глубже погрузиться в искусство театра. АРТГалей активно участвует в развитии культурной среды Антальи, предлагая современный взгляд на классические и авторские спектакли. Мы стремимся сохранить и развивать театральные традиции города, прославленного своими античными амфитеатрами, фестивалями и творческими инициативами.',
	},
]

const founder = {
	name: 'Артур Галеев',
	bio: 'Артур Галеев — театральный продюсер, режиссёр и актёр, основатель творческого объединения АРТГалей. Создаю и реализую современные спектакли в Анталье и Казани, способствуя развитию культурной жизни этих городов.',
	actingPortfolio: [
		'Фильм Гая Ричи «Министерство неджентельменских дел» — роль немецкого офицера',
		'Сериал «Ататюрк» — роль турецкого офицера',
		'Сериал «Цвет граната» — роль врача Леонида',
		'Участие в рекламных и театральных проектах',
	],
	producingPortfolio: [
		'Спродюсировал и организовал спектакли в Анталье и Казани',
		'Крупнейшие постановки: «Чем зацепить миллионера?», «Номер 13», «Капкан»',
		'Активно развиваю театральное искусство на международной сцене',
	],
}

type TimelineStatus = 'past' | 'current'

type TimelineCard = {
	id: string
	status: TimelineStatus
	date: string
	city: string
	time: string
	title: string
	image: string
	address?: string
	startsAtTimestamp: number
	price?: string
	href?: string
	badge?: string
	highlight?: boolean
}

type ContactLink = {
	label: string
	href: string
	icon: ComponentType<{ className?: string }>
}

const contactLinks: ContactLink[] = [
	{
		label: 'Telegram',
		href: 'https://t.me/artgaley',
		icon: Telegram,
	},
	{
		label: 'Отзывы',
		href: 'https://t.me/artgaleyto',
		icon: MessageCircle,
	},
	{
		label: 'Позвонить',
		href: 'tel:+79656071642',
		icon: Phone,
	},
]

function toShortDate(dateLabel: string) {
	const cleaned = dateLabel.toLowerCase().replace(/,/g, ' ').trim()
	if (!cleaned) {
		return 'СКОРО'
	}
	const [day, month] = cleaned.split(/\s+/)
	if (!day) {
		return 'СКОРО'
	}
	if (!month) {
		return day.toUpperCase()
	}
	const normalizedMonth = monthToShort[month] ?? month.slice(0, 3).toUpperCase()
	return `${day} ${normalizedMonth}`.toUpperCase()
}

function splitTitle(label: string) {
	const words = label.trim().split(/\s+/).filter(Boolean)
	if (words.length === 0) {
		return ['Новый', 'показ', 'скоро'] as const
	}
	if (words.length <= 2) {
		return [label, '', ''] as const
	}
	return [words[0], words[1], words.slice(2).join(' ')] as const
}

function getExternalProps(href: string) {
	if (href.startsWith('http://') || href.startsWith('https://')) {
		return { target: '_blank', rel: 'noreferrer' } as const
	}
	return {}
}

function cutText(value: string, limit: number) {
	if (value.length <= limit) {
		return value
	}
	return `${value.slice(0, limit).trim()}...`
}

function splitMemberName(name: string) {
	const [firstLine, ...rest] = name.trim().split(/\s+/).filter(Boolean)
	return {
		firstLine: firstLine || '',
		secondLine: rest.join(' '),
	}
}

function parseEventTimestamp(event: EventData) {
	if (!event.startsAt) {
		return Number.NaN
	}
	const timestamp = Date.parse(event.startsAt)
	return Number.isFinite(timestamp) ? timestamp : Number.NaN
}

function getTimelineCity(address: string) {
	return /антал/i.test(address) ? 'Анталья' : 'Казань'
}

function mapEventToTimelineCard(event: EventData, index: number): TimelineCard {
	const startsAtTimestamp = parseEventTimestamp(event)
	const status: TimelineStatus =
		Number.isFinite(startsAtTimestamp) && startsAtTimestamp < Date.now()
			? 'past'
			: 'current'

	return {
		id: `${event.startsAt ?? event.date}-${event.label}-${index}`,
		status,
		date: toShortDate(event.date?.trim() || ''),
		city: getTimelineCity(event.address || ''),
		time: event.time?.trim() || '',
		title: event.label?.trim() || 'Новый показ скоро',
		image: event.image || '/images/masks.png',
		address: event.address?.trim() || '',
		href: event.kassirUrl?.trim() || undefined,
		startsAtTimestamp,
	}
}

function compareTimelineCardsDesc(a: TimelineCard, b: TimelineCard) {
	const aHasTimestamp = Number.isFinite(a.startsAtTimestamp)
	const bHasTimestamp = Number.isFinite(b.startsAtTimestamp)

	if (aHasTimestamp && bHasTimestamp) {
		return b.startsAtTimestamp - a.startsAtTimestamp
	}
	if (aHasTimestamp) {
		return -1
	}
	if (bHasTimestamp) {
		return 1
	}
	return 0
}

type TimelineEventCardBodyProps = {
	card: TimelineCard
	highlighted: boolean
}

function TimelineEventCardBody({
	card,
	highlighted,
}: TimelineEventCardBodyProps) {
	const isPast = card.status === 'past'
	const hasTicketLink = Boolean(card.href) && !isPast
	const ticketHref = hasTicketLink ? (card.href ?? '') : ''
	const metaBadge = isPast
		? 'Завершено'
		: hasTicketLink
			? 'Продажа открыта'
			: 'Скоро'
	const imageMetaLabel = `${card.city}${card.time ? ` • ${card.time}` : ''}`
	const imageTag = card.badge || metaBadge

	return (
		<div
			className={`flex h-full flex-col rounded-2xl border p-4 sm:p-5 ${
				highlighted
					? 'border-[#d4af37]/40 bg-[#141414] shadow-[0_18px_44px_-20px_rgba(0,0,0,0.85)]'
					: 'border-white/10 bg-[#111111] transition-colors duration-300 hover:border-[#d4af37]/35'
			}`}
		>
			<div
				className={`relative isolate mb-4 overflow-hidden rounded-xl border border-white/10 bg-black ${
					highlighted
						? 'aspect-[4/5] sm:aspect-[3/4]'
						: 'aspect-[3/4] sm:aspect-[5/6]'
				}`}
			>
				<Image
					src={card.image}
					alt={card.title}
					fill
					className={`pointer-events-none z-0 h-full w-full object-cover object-[50%_24%] transition-transform duration-700 ${
						highlighted
							? 'group-hover:scale-[1.02]'
							: 'grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0'
					}`}
				/>
				<div className='absolute inset-0 z-10 bg-gradient-to-t from-black/78 via-black/12 to-black/35' />
				<div className='absolute inset-x-3 bottom-3 z-20 flex items-center justify-between gap-2'>
					<span className='max-w-[58%] truncate whitespace-nowrap rounded-full border border-white/15 bg-black/60 px-2 py-1 text-[9px] uppercase tracking-[0.1em] text-[#d4af37] sm:max-w-none sm:px-2.5 sm:text-[10px] sm:tracking-[0.13em]'>
						{imageMetaLabel}
					</span>
					<span
						className={`shrink-0 whitespace-nowrap rounded-full px-2 py-1 text-[8px] uppercase tracking-[0.1em] sm:px-2.5 sm:text-[10px] sm:tracking-[0.13em] ${
							isPast
								? 'bg-slate-800/80 text-slate-300'
								: 'bg-black/65 text-white'
						}`}
					>
						{imageTag}
					</span>
				</div>
			</div>

			<h3
				className={`[font-family:var(--font-cormorant)] text-white [display:-webkit-box] overflow-hidden [-webkit-box-orient:vertical] ${
					highlighted
						? 'min-h-[5.5rem] text-3xl leading-tight [-webkit-line-clamp:3]'
						: 'min-h-[4.75rem] text-2xl leading-tight [-webkit-line-clamp:2]'
				}`}
			>
				{card.title}
			</h3>

			{card.address && (
				<p className='mt-3 flex items-start gap-1.5 text-xs text-slate-400'>
					<MapPin className='mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500' />
					<span className='[display:-webkit-box] overflow-hidden [-webkit-box-orient:vertical] [-webkit-line-clamp:1]'>
						{card.address}
					</span>
				</p>
			)}

			<div className='mt-auto border-t border-white/10 pt-4'>
				<div className='flex items-center justify-between gap-3'>
					<span className='[font-family:var(--font-cormorant)] text-lg italic text-white'>
						{card.price || (isPast ? 'Показ завершен' : 'Билеты онлайн')}
					</span>

					{isPast ? (
						<span className='rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-500'>
							Завершено
						</span>
					) : hasTicketLink ? (
						<a
							href={ticketHref}
							{...getExternalProps(ticketHref)}
							aria-label={`Купить билет на ${card.title}`}
							className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] transition-colors ${
								highlighted
									? 'bg-[#d4af37] text-black hover:bg-[#e2c35b]'
									: 'border border-white/20 text-slate-200 hover:border-[#d4af37]/55 hover:text-[#d4af37]'
							}`}
						>
							Билет
							<ArrowUpRight className='h-3.5 w-3.5' />
						</a>
					) : (
						<span className='rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-500'>
							Скоро
						</span>
					)}
				</div>
			</div>
		</div>
	)
}

interface TheaterHomeClientProps {
	event: EventData
	timelineEvents: EventData[]
}

export function TheaterHomeClient({
	event,
	timelineEvents,
}: TheaterHomeClientProps) {
	const rootRef = useRef<HTMLElement>(null)
	const desktopTimelineRef = useRef<HTMLDivElement>(null)
	const cityStoryRef = useRef<HTMLDivElement>(null)
	const [desktopCardLimit, setDesktopCardLimit] = useState(3)

	const eventTitle = event.label?.trim() || 'Новый показ скоро'
	const eventDate = event.date?.trim() || ''
	const eventAddress = event.address?.trim() || 'Следите за обновлениями'
	const eventKassir = event.kassirUrl?.trim() || undefined
	const eventMap = event.mapsUrl?.trim() || undefined
	const eventTime = event.time?.trim() || 'Время уточняется'
	const eventSummary = cutText(
		(event.description || '')
			.replace(/\r?\n/g, ' ')
			.replace(/\s+/g, ' ')
			.trim() || 'Иммерсивный спектакль с живой атмосферой и камерной подачей.',
		140,
	)
	const [titleLineA, titleLineB, titleLineC] = splitTitle(eventTitle)
	const featuredMembers = teamMembers.slice(0, 6)
	const [activeCityId, setActiveCityId] = useState<string>(
		/антал/i.test(eventAddress) ? 'antalya' : 'kazan',
	)
	const activeCityStory =
		cityStories.find(city => city.id === activeCityId) ?? cityStories[0]

	const timelineCardsLatestFirst = useMemo<TimelineCard[]>(() => {
		const sourceEvents = [event, ...timelineEvents]
		const uniqueEvents = sourceEvents.filter((candidate, index, array) => {
			const candidateKey = `${candidate.startsAt ?? ''}|${candidate.label}|${candidate.date}|${candidate.time ?? ''}|${candidate.address}`
			return (
				array.findIndex(item => {
					const itemKey = `${item.startsAt ?? ''}|${item.label}|${item.date}|${item.time ?? ''}|${item.address}`
					return itemKey === candidateKey
				}) === index
			)
		})

		const cards = uniqueEvents.map(mapEventToTimelineCard)
		const anchorTimestamp = parseEventTimestamp(event)
		const filteredCards = Number.isFinite(anchorTimestamp)
			? cards.filter(
					card =>
						!Number.isFinite(card.startsAtTimestamp) ||
						card.startsAtTimestamp <= anchorTimestamp,
				)
			: cards
		const timelineSource = filteredCards.length > 0 ? filteredCards : cards
		const sorted = [...timelineSource].sort(compareTimelineCardsDesc)

		return sorted.map((card, index) => ({
			...card,
			highlight: index === 0,
			badge:
				index === 0
					? card.status === 'past'
						? 'Последний показ'
						: 'Ближайший показ'
					: card.status === 'past'
						? 'Архив'
						: undefined,
		}))
	}, [event, timelineEvents])

	const desktopTimelineCards = useMemo(() => {
		const selected = timelineCardsLatestFirst.slice(0, desktopCardLimit)
		return [...selected].reverse()
	}, [desktopCardLimit, timelineCardsLatestFirst])

	const mobileTimelineCards = useMemo(
		() => timelineCardsLatestFirst.slice(0, 5),
		[timelineCardsLatestFirst],
	)

	useEffect(() => {
		const target = desktopTimelineRef.current
		if (!target) {
			return
		}

		const updateDesktopCardLimit = () => {
			const containerWidth = target.clientWidth
			if (!containerWidth) {
				return
			}
			const cardWidth = 316
			const gap = 28
			const visibleCards = Math.max(
				1,
				Math.floor((containerWidth + gap) / (cardWidth + gap)),
			)
			setDesktopCardLimit(visibleCards)
		}

		updateDesktopCardLimit()

		if (typeof ResizeObserver === 'undefined') {
			window.addEventListener('resize', updateDesktopCardLimit)
			return () => {
				window.removeEventListener('resize', updateDesktopCardLimit)
			}
		}

		const observer = new ResizeObserver(updateDesktopCardLimit)
		observer.observe(target)
		window.addEventListener('resize', updateDesktopCardLimit)

		return () => {
			observer.disconnect()
			window.removeEventListener('resize', updateDesktopCardLimit)
		}
	}, [])

	useLayoutEffect(() => {
		if (!rootRef.current) {
			return
		}

		gsap.registerPlugin(ScrollTrigger)

		const ctx = gsap.context(() => {
			gsap.from('.st-hero-kicker', {
				opacity: 0,
				y: 24,
				duration: 0.9,
				ease: 'power3.out',
			})

			gsap.from('.st-hero-line', {
				opacity: 0,
				y: 84,
				duration: 1.3,
				stagger: 0.16,
				ease: 'power4.out',
				delay: 0.12,
			})

			gsap.from('.st-hero-meta', {
				opacity: 0,
				y: 24,
				duration: 0.95,
				stagger: 0.12,
				ease: 'power3.out',
				delay: 0.45,
			})

			gsap.utils.toArray<HTMLElement>('.st-reveal').forEach(element => {
				gsap.from(element, {
					scrollTrigger: {
						trigger: element,
						start: 'top 86%',
						toggleActions: 'play none none reverse',
					},
					opacity: 0,
					y: 34,
					filter: 'blur(4px)',
					duration: 1.05,
					ease: 'power3.out',
				})
			})

			gsap.utils.toArray<HTMLElement>('.st-scale').forEach(element => {
				gsap.from(element, {
					scrollTrigger: {
						trigger: element,
						start: 'top 82%',
						toggleActions: 'play none none reverse',
					},
					opacity: 0,
					scale: 0.94,
					filter: 'blur(5px)',
					duration: 1.15,
					ease: 'expo.out',
				})
			})

			const timelineCards = gsap.utils.toArray<HTMLElement>('.st-timeline-card')
			if (timelineCards.length > 0) {
				gsap.from(timelineCards, {
					scrollTrigger: {
						trigger: '#calendar',
						start: 'top 74%',
					},
					opacity: 0,
					y: 30,
					duration: 0.85,
					stagger: 0.1,
					ease: 'power2.out',
				})
			}

			const timelineLine =
				rootRef.current?.querySelector<HTMLElement>('.st-timeline-line')
			if (timelineLine) {
				gsap.from(timelineLine, {
					scrollTrigger: {
						trigger: '#calendar',
						start: 'top 74%',
					},
					scaleX: 0,
					duration: 1.3,
					ease: 'power3.out',
				})
			}
		}, rootRef)

		return () => {
			ctx.revert()
		}
	}, [])

	useEffect(() => {
		if (!cityStoryRef.current) {
			return
		}
		gsap.killTweensOf(cityStoryRef.current)
		gsap.fromTo(
			cityStoryRef.current,
			{ autoAlpha: 0, y: 16 },
			{
				autoAlpha: 1,
				y: 0,
				duration: 0.5,
				ease: 'power2.out',
				clearProps: 'opacity,visibility,transform',
			},
		)
	}, [activeCityId])

	return (
		<Sheet>
			<main
				ref={rootRef}
				className={`${manrope.variable} ${cormorant.variable} relative min-h-screen overflow-x-clip bg-[#030303] text-slate-200 [font-family:var(--font-manrope)]`}
			>
				<Link
					href='/'
					className='fixed left-6 top-5 z-50 hidden [font-family:var(--font-cormorant)] text-2xl uppercase tracking-[0.18em] text-white lg:block'
				>
					АРТГалей
				</Link>

				<aside className='fixed right-0 top-0 z-50 hidden h-full w-20 flex-col items-center justify-between border-l border-white/10 bg-black/45 py-8 backdrop-blur-xl lg:flex'>
					<SheetTrigger asChild>
						<button
							type='button'
							className='p-2 text-white transition-colors duration-300 hover:text-[#d4af37]'
							aria-label='Открыть меню'
						>
							<Menu className='h-7 w-7' />
						</button>
					</SheetTrigger>
					<div className='my-8 flex h-full items-center'>
						<div className='relative h-full w-px bg-white/15'>
							<div className='absolute left-1/2 top-0 h-14 w-px -translate-x-1/2 bg-[#d4af37]' />
						</div>
					</div>
					<a
						href={eventKassir || '#calendar'}
						{...(eventKassir ? getExternalProps(eventKassir) : {})}
						className='group relative flex items-center justify-center'
					>
						<span className='pointer-events-none absolute right-full mr-5 whitespace-nowrap bg-[#d4af37] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
							Купить билет
						</span>
						<span className='flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/40 text-[#d4af37] shadow-[0_0_24px_rgba(212,175,55,0.18)] transition-all duration-300 group-hover:bg-[#d4af37] group-hover:text-black'>
							<Ticket className='h-5 w-5' />
						</span>
					</a>
				</aside>

				<header className='fixed left-0 top-0 z-40 w-full border-b border-white/5 bg-black/70 backdrop-blur-md lg:hidden'>
					<div className='mx-auto flex h-20 w-full max-w-[1400px] items-center justify-between px-6'>
						<span className='[font-family:var(--font-cormorant)] text-2xl uppercase tracking-[0.18em] text-white'>
							АРТГалей
						</span>
						<SheetTrigger asChild>
							<button
								type='button'
								className='p-2 text-white'
								aria-label='Открыть меню'
							>
								<Menu className='h-6 w-6' />
							</button>
						</SheetTrigger>
					</div>
				</header>

				<section
					id='hero'
					className='relative flex min-h-screen items-end overflow-hidden pt-24 lg:pt-0'
				>
					<div className='absolute inset-0 bg-black'>
						<Image
							src={event.image}
							alt=''
							aria-hidden
							fill
							priority
							className='pointer-events-none h-full w-full scale-105 object-cover object-center opacity-32 blur-[2px]'
						/>
						<Image
							src={event.image}
							alt={eventTitle}
							fill
							priority
							className='pointer-events-none h-full w-full object-contain object-center opacity-85 lg:object-[78%_center]'
						/>
						<div className='absolute inset-0 bg-gradient-to-r from-[#030303]/88 via-[#030303]/52 to-[#030303]/18' />
						<div className='absolute inset-0 bg-gradient-to-t from-[#030303]/72 via-[#030303]/12 to-transparent' />
						<div className='absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(212,175,55,0.12),transparent_42%)]' />
					</div>

					<div className='relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-12 px-6 pb-16 lg:grid-cols-12 lg:gap-8 lg:pl-16 lg:pr-28 lg:pb-20'>
						<div className='lg:col-span-8'>
							<p className='st-hero-kicker mb-6 pl-1 text-xs uppercase tracking-[0.38em] text-[#d4af37]'>
								Премьера сезона
							</p>
							<h1 className='[font-family:var(--font-cormorant)] text-[3.2rem] leading-[0.9] text-white sm:text-[4.4rem] md:text-[5.4rem] lg:text-[6.6rem] xl:text-[7.4rem]'>
								{titleLineA && (
									<span className='st-hero-line block'>{titleLineA}</span>
								)}
								{titleLineB && (
									<span className='st-hero-line block pl-8 italic font-light text-slate-300 sm:pl-14'>
										{titleLineB}
									</span>
								)}
								{titleLineC && (
									<span className='st-hero-line block'>{titleLineC}</span>
								)}
							</h1>

							<div className='mt-9 grid gap-7 text-sm md:grid-cols-2 md:gap-10'>
								<div className='st-hero-meta'>
									<p className='mb-2 text-[11px] font-medium uppercase tracking-[0.24em] text-slate-300'>
										Когда
									</p>
									<p className='flex items-center gap-2.5 text-lg leading-snug text-white [font-family:var(--font-cormorant)] sm:text-xl'>
										<CalendarDays className='h-4 w-4 shrink-0 text-[#d4af37]' />
										<span className='min-w-0'>
											{eventDate ? `${eventDate}, ${eventTime}` : eventTime}
										</span>
									</p>
								</div>
								<div className='st-hero-meta'>
									<p className='mb-2 text-[11px] font-medium uppercase tracking-[0.24em] text-slate-300'>
										Где
									</p>
									<p className='flex items-start gap-2.5 text-lg leading-snug text-white [font-family:var(--font-cormorant)] sm:text-xl'>
										<MapPin className='mt-1 h-4 w-4 shrink-0 text-[#d4af37]' />
										<span className='min-w-0 break-words'>{eventAddress}</span>
									</p>
								</div>
							</div>
						</div>

						<div className='st-hero-meta flex flex-col justify-end pb-2 lg:col-span-4 lg:items-end'>
							<p className='max-w-xs text-sm font-light leading-relaxed text-slate-300 lg:text-right'>
								{eventSummary}
							</p>
							<div className='mt-10 flex flex-wrap items-center gap-6'>
								<a
									href={eventKassir || '#calendar'}
									{...(eventKassir ? getExternalProps(eventKassir) : {})}
									className='inline-flex items-center gap-4 text-xs uppercase tracking-[0.22em] text-white transition-colors hover:text-[#d4af37]'
								>
									Купить билет
									<span className='h-px w-10 bg-white transition-colors hover:bg-[#d4af37]' />
								</a>
								{eventMap && (
									<a
										href={eventMap}
										{...getExternalProps(eventMap)}
										className='inline-flex items-center gap-1 text-xs uppercase tracking-[0.22em] text-slate-400 transition-colors hover:text-white'
									>
										Локация
										<ArrowUpRight className='h-3.5 w-3.5' />
									</a>
								)}
							</div>
						</div>
					</div>

					<div className='pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 opacity-55 md:flex'>
						<span className='text-[9px] uppercase tracking-[0.26em] text-white'>
							Листай
						</span>
						<div className='h-10 w-px bg-gradient-to-b from-white to-transparent' />
					</div>
				</section>

				<section id='about' className='bg-[#030303] py-24 lg:py-32'>
					<div className='mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-24 lg:pl-16 lg:pr-28'>
						<div className='st-scale relative order-2 hidden lg:order-1 lg:block'>
							<div className='relative aspect-[4/5] overflow-hidden border border-white/10'>
								<Image
									src='/images/afisha.png'
									alt='Афиша спектакля АРТГалей'
									fill
									className='pointer-events-none h-full w-full object-cover grayscale transition duration-700 hover:grayscale-0'
								/>
							</div>
							<div className='absolute -bottom-8 -right-8 h-36 w-36 rounded-full bg-[#d4af37]/10 blur-3xl' />
						</div>

						<div className='order-1 lg:order-2'>
							<span className='st-reveal mb-7 block text-xs uppercase tracking-[0.38em] text-[#d4af37]'>
								Манифест
							</span>
							<h2 className='st-reveal [font-family:var(--font-cormorant)] text-4xl leading-tight text-white md:text-5xl lg:text-6xl'>
								Искусство, которое
								<br />
								<span className='italic font-light text-slate-400'>
									касается души
								</span>
							</h2>
							<div className='st-reveal mt-8 h-px w-20 bg-[#d4af37]' />
							<p className='st-reveal mt-8 text-lg font-light leading-relaxed text-slate-300'>
								В АРТГалей нет сцены и зрительного зала. Вы не наблюдатель, а
								соучастник. Мы создаем пространство, где стирается четвертая
								стена и чувства обостряются до предела.
							</p>
							<p className='st-reveal mt-5 text-lg font-light leading-relaxed text-slate-300'>
								Каждая постановка дышит вместе со зрителем: живой звук,
								тактильные детали, близкая дистанция и личный диалог между
								артистом и залом.
							</p>
						</div>
					</div>

					<div className='mx-auto mt-20 w-full max-w-[1400px] px-6 lg:pl-16 lg:pr-28'>
						<article className='st-reveal rounded-3xl border border-white/10 bg-gradient-to-br from-[#111111] via-[#0d0d0d] to-[#090909] p-5 md:p-7 lg:p-8'>
							<div className='grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-8'>
								<Drawer>
									<DrawerTrigger asChild>
										<button
											type='button'
											className='overflow-hidden rounded-2xl border border-white/10 bg-black/45 text-left lg:hidden'
											aria-label={`Открыть информацию: ${founder.name}`}
										>
											<div className='relative aspect-[3/4]'>
												<Image
													src='/images/subject.png'
													alt={founder.name}
													fill
													className='pointer-events-none object-cover object-top'
												/>
												<div className='absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent' />
												<div className='pointer-events-none absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-slate-300 shadow-[0_8px_20px_-12px_rgba(0,0,0,0.9)]'>
													<MousePointerClick className='h-5 w-5' />
												</div>
											</div>
											<div className='flex items-center justify-center border-t border-white/10 px-4 py-3 text-[11px] tracking-[0.12em] text-slate-200'>
												<span>{founder.name}</span>
											</div>
										</button>
									</DrawerTrigger>
									<DrawerContent className='border-white/10 bg-[#090909] text-slate-200'>
										<div className='mx-auto w-full max-w-2xl'>
											<DrawerHeader className='border-b border-white/10 text-left'>
												<DrawerDescription className='text-[11px] uppercase tracking-[0.18em] text-[#d4af37]'>
													Основатель АРТГалей
												</DrawerDescription>
												<DrawerTitle className='[font-family:var(--font-cormorant)] text-4xl text-white'>
													{founder.name}
												</DrawerTitle>
											</DrawerHeader>
											<ScrollArea className='h-[72vh]'>
												<div className='space-y-5 p-5'>
													<p className='text-sm leading-relaxed text-slate-300 sm:text-base'>
														{founder.bio}
													</p>
													<section className='rounded-2xl border border-white/10 bg-black/25 p-5'>
														<p className='mb-3 text-xs uppercase tracking-[0.16em] text-slate-400'>
															Актёрское портфолио
														</p>
														<ul className='list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300 marker:text-[#d4af37]'>
															{founder.actingPortfolio.map(item => (
																<li key={item}>{item}</li>
															))}
														</ul>
													</section>
													<section className='rounded-2xl border border-white/10 bg-black/25 p-5'>
														<p className='mb-3 text-xs uppercase tracking-[0.16em] text-slate-400'>
															Продюсерская деятельность
														</p>
														<ul className='list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300 marker:text-[#d4af37]'>
															{founder.producingPortfolio.map(item => (
																<li key={item}>{item}</li>
															))}
														</ul>
													</section>
												</div>
											</ScrollArea>
											<div className='border-t border-white/10 p-4'>
												<DrawerClose asChild>
													<button
														type='button'
														className='w-full rounded-full border border-white/15 px-4 py-3 text-[11px] uppercase tracking-[0.16em] text-slate-200 transition-colors hover:border-[#d4af37]/60 hover:text-white'
													>
														Закрыть
													</button>
												</DrawerClose>
											</div>
										</div>
									</DrawerContent>
								</Drawer>

								<figure className='hidden overflow-hidden rounded-2xl border border-white/10 bg-black/45 lg:block'>
									<div className='relative aspect-[3/4]'>
										<Image
											src='/images/subject.png'
											alt={founder.name}
											fill
											className='pointer-events-none object-cover object-top'
										/>
										<div className='absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent' />
									</div>
								</figure>

								<div className='hidden space-y-5 lg:block'>
									<header className='rounded-2xl border border-white/10 bg-black/25 p-5 md:p-6'>
										<p className='text-xs uppercase tracking-[0.18em] text-[#d4af37]'>
											Основатель
										</p>
										<h3 className='mt-2 [font-family:var(--font-cormorant)] text-3xl text-white md:text-4xl'>
											{founder.name}
										</h3>
										<p className='mt-4 text-base leading-relaxed text-slate-300'>
											{founder.bio}
										</p>
									</header>

									<div className='grid gap-4 xl:grid-cols-2'>
										<section className='rounded-2xl border border-white/10 bg-black/25 p-5'>
											<p className='mb-3 text-xs uppercase tracking-[0.16em] text-slate-400'>
												Актёрское портфолио
											</p>
											<ul className='list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300 marker:text-[#d4af37]'>
												{founder.actingPortfolio.map(item => (
													<li key={item}>{item}</li>
												))}
											</ul>
										</section>

										<section className='rounded-2xl border border-white/10 bg-black/25 p-5'>
											<p className='mb-3 text-xs uppercase tracking-[0.16em] text-slate-400'>
												Продюсерская деятельность
											</p>
											<ul className='list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300 marker:text-[#d4af37]'>
												{founder.producingPortfolio.map(item => (
													<li key={item}>{item}</li>
												))}
											</ul>
										</section>
									</div>
								</div>
							</div>
						</article>
					</div>
				</section>

				<section
					id='calendar'
					className='relative overflow-hidden border-t border-white/5 bg-[#080808] py-24'
				>
					<div className='mx-auto mb-14 w-full max-w-[1400px] px-6 lg:pl-16 lg:pr-28'>
						<h2 className='st-reveal [font-family:var(--font-cormorant)] text-4xl text-white md:text-6xl'>
							Афиша событий
						</h2>
					</div>

					<div
						ref={desktopTimelineRef}
						className='mx-auto hidden w-full max-w-[1400px] px-6 pb-10 lg:block lg:pl-16 lg:pr-28'
					>
						<div className='relative flex items-start gap-7 pt-12'>
							<div className='st-timeline-line absolute left-0 top-[40px] h-px w-full origin-left bg-gradient-to-r from-transparent via-white/20 to-transparent' />

							{desktopTimelineCards.map(card => {
								const isPrimary = Boolean(card.highlight)

								return (
									<article
										key={card.id}
										className={`st-timeline-card group relative z-10 ${
											isPrimary ? 'w-[360px]' : 'w-[296px]'
										}`}
									>
										<div className='relative mb-7 flex flex-col items-center'>
											<div
												className={`rounded-full border-2 transition-colors ${
													isPrimary
														? 'h-4 w-4 border-[#d4af37] bg-[#d4af37] shadow-[0_0_18px_rgba(212,175,55,0.45)]'
														: 'h-3 w-3 border-slate-600 bg-[#080808] group-hover:border-[#d4af37]'
												}`}
											/>
											<span
												className={`absolute -top-8 tracking-[0.2em] ${
													isPrimary
														? 'text-xs font-bold text-[#d4af37]'
														: 'text-[10px] font-medium text-slate-500'
												}`}
											>
												{card.date}
											</span>
										</div>

										<TimelineEventCardBody
											card={card}
											highlighted={isPrimary}
										/>
									</article>
								)
							})}
						</div>
					</div>

					<div className='mx-auto w-full max-w-[1400px] px-6 lg:hidden'>
						<Carousel
							opts={{
								align: 'start',
								containScroll: 'trimSnaps',
							}}
							className='st-reveal'
						>
							<CarouselContent>
								{mobileTimelineCards.map(card => {
									const isPrimary = Boolean(card.highlight)

									return (
										<CarouselItem
											key={`mobile-${card.id}`}
											className='basis-[88%]'
										>
											<article className='st-timeline-card group relative z-10'>
												<div className='mb-3 flex items-center justify-between border-b border-white/10 pb-3'>
													<span className='whitespace-nowrap text-[10px] uppercase tracking-[0.18em] text-[#d4af37] sm:text-[11px] sm:tracking-[0.2em]'>
														{card.date}
													</span>
													<div
														className={`rounded-full border-2 ${
															isPrimary
																? 'h-3.5 w-3.5 border-[#d4af37] bg-[#d4af37] shadow-[0_0_14px_rgba(212,175,55,0.45)]'
																: 'h-3 w-3 border-slate-600 bg-[#080808]'
														}`}
													/>
												</div>
												<TimelineEventCardBody
													card={card}
													highlighted={isPrimary}
												/>
											</article>
										</CarouselItem>
									)
								})}
							</CarouselContent>
						</Carousel>
					</div>
				</section>

				<section id='cities' className='bg-[#030303] py-24'>
					<div className='mx-auto w-full max-w-[1400px] px-6 lg:pl-16 lg:pr-28'>
						<div className='grid grid-cols-1 border border-white/10 lg:hidden'>
							{cityStories.map((city, index) => (
								<Drawer key={`city-mobile-${city.id}`}>
									<DrawerTrigger asChild>
										<button
											type='button'
											className={`st-scale group relative block h-[320px] overflow-hidden sm:h-[380px] ${
												index === 0 ? 'border-b border-white/10' : ''
											}`}
											aria-label={`Открыть информацию о городе ${city.city}`}
										>
											<Image
												src={city.image}
												alt={city.city}
												fill
												className='pointer-events-none object-cover opacity-45 transition duration-700 group-hover:scale-105 group-hover:opacity-65'
											/>
											<div className='absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent' />
											<div className='relative z-10 flex h-full flex-col justify-end p-6 sm:p-8'>
												<h3 className='[font-family:var(--font-cormorant)] text-4xl text-white sm:text-5xl'>
													{city.city.toUpperCase()}
												</h3>
												<p className='mt-2 text-xs uppercase tracking-[0.18em] text-[#d4af37]'>
													{city.since}
												</p>
												<div className='mt-4 flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-slate-300'>
													Подробнее
													<ArrowUpRight className='h-3.5 w-3.5' />
												</div>
											</div>
										</button>
									</DrawerTrigger>
									<DrawerContent className='border-white/10 bg-[#090909] text-slate-200'>
										<div className='mx-auto w-full max-w-2xl'>
											<DrawerHeader className='border-b border-white/10 text-left'>
												<DrawerDescription className='text-[11px] uppercase tracking-[0.18em] text-[#d4af37]'>
													{city.since}
												</DrawerDescription>
												<DrawerTitle className='[font-family:var(--font-cormorant)] text-4xl text-white'>
													{city.city}
												</DrawerTitle>
											</DrawerHeader>
											<ScrollArea className='h-[72vh]'>
												<div className='space-y-5 p-5'>
													<div className='relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-black/40'>
														<Image
															src={city.image}
															alt={city.city}
															fill
															className='pointer-events-none object-cover'
														/>
													</div>
													<p className='text-sm leading-relaxed text-slate-300'>
														{city.description}
													</p>
													<p className='text-sm leading-relaxed text-slate-300'>
														{city.fullText}
													</p>
												</div>
											</ScrollArea>
											<div className='border-t border-white/10 p-4'>
												<DrawerClose asChild>
													<button
														type='button'
														className='w-full rounded-full border border-white/15 px-4 py-3 text-[11px] uppercase tracking-[0.16em] text-slate-200 transition-colors hover:border-[#d4af37]/60 hover:text-white'
													>
														Закрыть
													</button>
												</DrawerClose>
											</div>
										</div>
									</DrawerContent>
								</Drawer>
							))}
						</div>

						<div className='hidden grid-cols-1 border border-white/10 lg:grid lg:grid-cols-2'>
							{cityStories.map((city, index) => (
								<button
									key={city.id}
									type='button'
									onClick={() => setActiveCityId(city.id)}
									aria-pressed={activeCityId === city.id}
									className={`st-scale group relative block h-[460px] overflow-hidden ${
										index === 0 ? 'border-r border-white/10' : ''
									} ${
										activeCityId === city.id
											? 'ring-1 ring-inset ring-[#d4af37]/65'
											: ''
									}`}
								>
									<Image
										src={city.image}
										alt={city.city}
										fill
										className='pointer-events-none object-cover opacity-45 transition duration-1000 group-hover:scale-110 group-hover:opacity-70'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent' />
									<div className='relative z-10 flex h-full flex-col justify-end p-10'>
										<h3 className='st-reveal [font-family:var(--font-cormorant)] text-6xl text-white'>
											{city.city.toUpperCase()}
										</h3>
										<p className='mt-2 text-xs uppercase tracking-[0.18em] text-[#d4af37]'>
											{city.since}
										</p>
										<div className='mt-4 h-px w-0 bg-[#d4af37] transition-all duration-500 group-hover:w-24' />
										<p className='mt-4 max-w-sm translate-y-3 text-sm font-light leading-relaxed text-slate-300 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100'>
											{city.description}
										</p>
										<span className='mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-slate-300'>
											Подробнее
											<ArrowUpRight className='h-3.5 w-3.5' />
										</span>
									</div>
								</button>
							))}
						</div>

						<div className='mt-6 hidden rounded-2xl border border-white/10 bg-[#0d0d0d] p-5 sm:p-6 lg:block'>
							<div ref={cityStoryRef}>
								<div className='flex flex-wrap items-baseline gap-3'>
									<h3 className='[font-family:var(--font-cormorant)] text-3xl text-white sm:text-4xl'>
										{activeCityStory.city}
									</h3>
									<span className='text-xs uppercase tracking-[0.18em] text-[#d4af37]'>
										{activeCityStory.since}
									</span>
								</div>
								<p className='mt-4 text-sm leading-relaxed text-slate-300'>
									{activeCityStory.description}
								</p>
								<p className='mt-4 text-sm leading-relaxed text-slate-300'>
									{activeCityStory.fullText}
								</p>
							</div>
						</div>

						<section id='faces' className='mt-20'>
							<div className='mb-10 flex flex-wrap items-end justify-between gap-4'>
								<div>
									<h2 className='st-reveal [font-family:var(--font-cormorant)] text-4xl text-white'>
										Лица театра
									</h2>
									<p className='st-reveal mt-2 text-[10px] uppercase tracking-[0.2em] text-slate-500'>
										{featuredMembers.length} артистов на сцене прямо сейчас
									</p>
								</div>
								<div className='hidden lg:block'>
									<Sheet>
										<SheetTrigger asChild>
											<button
												type='button'
												className='st-reveal inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-slate-300 transition-colors hover:border-[#d4af37]/50 hover:text-white'
											>
												Достижения
												<ArrowUpRight className='h-3.5 w-3.5' />
											</button>
										</SheetTrigger>
										<SheetContent
											side='right'
											className='w-[92vw] overflow-y-auto border-white/10 bg-[#090909] text-slate-200 sm:max-w-2xl'
										>
											<SheetHeader>
												<SheetTitle className='[font-family:var(--font-cormorant)] text-3xl text-white'>
													Труппа АРТГалей
												</SheetTitle>
												<SheetDescription className='text-slate-400'>
													{teamMembers.length} артистов и участников проекта.
												</SheetDescription>
											</SheetHeader>
											<div className='mt-7 grid gap-4 sm:grid-cols-2'>
												{teamMembers.map(member => {
													const { firstLine, secondLine } = splitMemberName(
														member.name,
													)
													return (
														<article
															key={member.id}
															className='rounded-xl border border-white/10 bg-[#111111] p-4'
														>
															<div className='flex items-start gap-3'>
																<div className='relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10'>
																	<Image
																		src={member.avatar ?? '/images/subject.png'}
																		alt={member.name}
																		fill
																		className='pointer-events-none object-cover'
																	/>
																</div>
																<div className='min-w-0'>
																	<h3 className='[font-family:var(--font-cormorant)] text-2xl leading-none text-white'>
																		<span className='block'>{firstLine}</span>
																		<span className='block'>
																			{secondLine || '\u00A0'}
																		</span>
																	</h3>
																	<p className='mt-2 text-xs uppercase tracking-[0.16em] text-[#d4af37]'>
																		{member.roles.join(' • ')}
																	</p>
																</div>
															</div>
															<p className='mt-3 text-sm leading-relaxed text-slate-400'>
																{member.experience.slice(0, 2).join(' · ') ||
																	'Опыт не указан'}
															</p>
														</article>
													)
												})}
											</div>
										</SheetContent>
									</Sheet>
								</div>
							</div>

							<div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6'>
								{featuredMembers.map(member => (
									<Fragment key={member.id}>
										<Drawer>
											<DrawerTrigger asChild>
												<button
													type='button'
													className='st-face-card group relative overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d] text-left transition-all duration-300 lg:hidden'
													aria-label={`Открыть информацию об актере ${member.name}`}
												>
													<div className='relative aspect-[4/5] overflow-hidden'>
														<Image
															src={member.avatar ?? '/images/subject.png'}
															alt={member.name}
															fill
															className='pointer-events-none object-cover object-center grayscale transition duration-500'
														/>
														<div className='pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />
													</div>
													<div className='p-3'>
														<p className='[font-family:var(--font-cormorant)] text-xl leading-none text-white'>
															{member.name}
														</p>
													</div>
												</button>
											</DrawerTrigger>
											<DrawerContent className='border-white/10 bg-[#090909] text-slate-200'>
												<div className='mx-auto w-full max-w-2xl'>
													<DrawerHeader className='border-b border-white/10 text-left'>
														<DrawerDescription className='text-[11px] uppercase tracking-[0.18em] text-[#d4af37]'>
															{member.roles.join(' • ') || 'Труппа АРТГалей'}
														</DrawerDescription>
														<DrawerTitle className='[font-family:var(--font-cormorant)] text-4xl text-white'>
															{member.name}
														</DrawerTitle>
													</DrawerHeader>
													<ScrollArea className='h-[72vh]'>
														<div className='space-y-5 p-5'>
															<div className='relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-black/40 sm:aspect-[16/10]'>
																<Image
																	src={member.avatar ?? '/images/subject.png'}
																	alt={member.name}
																	fill
																	className='pointer-events-none object-cover object-top'
																/>
															</div>
															<p className='text-xs uppercase tracking-[0.16em] text-slate-400'>
																{member.roles.join(' • ') || 'Участник проекта'}
															</p>
															{member.experience.length > 0 ? (
																<ul className='list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300 marker:text-[#d4af37]'>
																	{member.experience.map(item => (
																		<li key={item}>{item}</li>
																	))}
																</ul>
															) : (
																<p className='text-sm leading-relaxed text-slate-300'>
																	Опыт не указан.
																</p>
															)}
														</div>
													</ScrollArea>
													<div className='border-t border-white/10 p-4'>
														<DrawerClose asChild>
															<button
																type='button'
																className='w-full rounded-full border border-white/15 px-4 py-3 text-[11px] uppercase tracking-[0.16em] text-slate-200 transition-colors hover:border-[#d4af37]/60 hover:text-white'
															>
																Закрыть
															</button>
														</DrawerClose>
													</div>
												</div>
											</DrawerContent>
										</Drawer>

										<article className='st-face-card group relative hidden overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d] transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37]/45 hover:shadow-[0_16px_36px_-20px_rgba(0,0,0,0.9)] lg:block'>
											<div className='relative aspect-[4/5] overflow-hidden'>
												<Image
													src={member.avatar ?? '/images/subject.png'}
													alt={member.name}
													fill
													className='pointer-events-none object-cover object-center grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0'
												/>
												<div className='pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />
											</div>
											<div className='p-3'>
												<p className='[font-family:var(--font-cormorant)] text-xl leading-none text-white'>
													{member.name}
												</p>
											</div>
										</article>
									</Fragment>
								))}
							</div>
						</section>
					</div>
				</section>

				<footer id='contact' className='border-t border-white/5 bg-black py-24'>
					<div className='mx-auto w-full max-w-[1400px] px-6 lg:pl-16 lg:pr-28'>
						<div className='grid grid-cols-1 gap-14 md:grid-cols-2'>
							<div>
								<span className='st-reveal mb-8 block [font-family:var(--font-cormorant)] text-3xl uppercase tracking-[0.18em] text-white'>
									АРТГалей
								</span>
								<div className='st-reveal flex max-w-sm flex-col gap-5'>
									<a
										href='mailto:info@theaterartgaley.fun'
										className='text-2xl font-light text-slate-400 transition-all hover:pl-2 hover:text-white'
									>
										info@theaterartgaley.fun
									</a>
									<a
										href='tel:+79656071642'
										className='text-2xl font-light text-slate-400 transition-all hover:pl-2 hover:text-white'
									>
										+7 (965) 607-16-42
									</a>
								</div>
								<div className='st-reveal mt-10 flex gap-4'>
									{contactLinks.map(contact => (
										<a
											key={contact.label}
											href={contact.href}
											{...getExternalProps(contact.href)}
											className='flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all hover:border-[#d4af37] hover:text-[#d4af37]'
											aria-label={contact.label}
										>
											<contact.icon className='h-4 w-4' />
										</a>
									))}
								</div>
							</div>

							<div className='flex flex-col justify-between'>
								<div className='mb-12 grid grid-cols-2 gap-8'>
									<div className='st-reveal flex flex-col gap-4'>
										<a
											href='#about'
											className='text-[10px] uppercase tracking-[0.18em] text-slate-500 transition-colors hover:text-[#d4af37]'
										>
											О театре
										</a>
										<a
											href='#calendar'
											className='text-[10px] uppercase tracking-[0.18em] text-slate-500 transition-colors hover:text-[#d4af37]'
										>
											Афиша
										</a>
										<a
											href='#cities'
											className='text-[10px] uppercase tracking-[0.18em] text-slate-500 transition-colors hover:text-[#d4af37]'
										>
											Города
										</a>
									</div>
									<div className='st-reveal flex flex-col gap-4'>
										<a
											href='https://vk.com/artgaley'
											{...getExternalProps('https://vk.com/artgaley')}
											className='text-[10px] uppercase tracking-[0.18em] text-slate-500 transition-colors hover:text-[#d4af37]'
										>
											Сообщество VK
										</a>
										<Link
											href='/privacy'
											className='text-[10px] uppercase tracking-[0.18em] text-slate-500 transition-colors hover:text-[#d4af37]'
										>
											Политика
										</Link>
									</div>
								</div>
							</div>
						</div>

						<div className='mt-14 border-t border-white/10 pt-6 text-xs leading-relaxed text-slate-500'>
							<p>ИП Галеев Артур Радикович</p>
							<p>ИНН 027410843056</p>
							<p>
								© 2023-{new Date().getFullYear()} АРТГалей. Все права защищены.
							</p>
							<p className='mt-1'>Сайт использует cookie и Яндекс.Метрику.</p>
						</div>
					</div>
				</footer>

				<SheetContent
					side='right'
					className='w-[92vw] border-white/10 bg-[#090909] text-slate-200 sm:max-w-md'
				>
					<SheetHeader>
						<SheetTitle className='[font-family:var(--font-cormorant)] text-3xl uppercase tracking-[0.16em] text-white'>
							АРТГалей
						</SheetTitle>
						<SheetDescription className='text-slate-400'>
							Иммерсивные спектакли в Анталье и Казани.
						</SheetDescription>
					</SheetHeader>

					<nav className='mt-8 grid gap-3'>
						<SheetClose asChild>
							<a
								href='#hero'
								className='rounded-lg border border-white/10 px-4 py-3 text-sm uppercase tracking-[0.14em] text-slate-200 transition-colors hover:border-[#d4af37] hover:text-[#d4af37]'
							>
								Главная
							</a>
						</SheetClose>
						<SheetClose asChild>
							<a
								href='#about'
								className='rounded-lg border border-white/10 px-4 py-3 text-sm uppercase tracking-[0.14em] text-slate-200 transition-colors hover:border-[#d4af37] hover:text-[#d4af37]'
							>
								Манифест
							</a>
						</SheetClose>
						<SheetClose asChild>
							<a
								href='#calendar'
								className='rounded-lg border border-white/10 px-4 py-3 text-sm uppercase tracking-[0.14em] text-slate-200 transition-colors hover:border-[#d4af37] hover:text-[#d4af37]'
							>
								Афиша
							</a>
						</SheetClose>
						<SheetClose asChild>
							<a
								href='#cities'
								className='rounded-lg border border-white/10 px-4 py-3 text-sm uppercase tracking-[0.14em] text-slate-200 transition-colors hover:border-[#d4af37] hover:text-[#d4af37]'
							>
								Города
							</a>
						</SheetClose>
						<SheetClose asChild>
							<a
								href='#faces'
								className='rounded-lg border border-white/10 px-4 py-3 text-sm uppercase tracking-[0.14em] text-slate-200 transition-colors hover:border-[#d4af37] hover:text-[#d4af37]'
							>
								Труппа
							</a>
						</SheetClose>
						<SheetClose asChild>
							<a
								href='#contact'
								className='rounded-lg border border-white/10 px-4 py-3 text-sm uppercase tracking-[0.14em] text-slate-200 transition-colors hover:border-[#d4af37] hover:text-[#d4af37]'
							>
								Контакты
							</a>
						</SheetClose>
					</nav>

					<div className='mt-6 grid gap-3'>
						{eventKassir ? (
							<SheetClose asChild>
								<a
									href={eventKassir}
									{...getExternalProps(eventKassir)}
									className='inline-flex items-center justify-center gap-2 rounded-lg bg-[#d4af37] px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-black transition-colors hover:bg-[#e6c459]'
								>
									Купить билет
									<ArrowUpRight className='h-4 w-4' />
								</a>
							</SheetClose>
						) : null}

						<SheetClose asChild>
							<a
								href='https://t.me/artgaley'
								{...getExternalProps('https://t.me/artgaley')}
								className='inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm uppercase tracking-[0.14em] text-slate-200 transition-colors hover:border-[#d4af37] hover:text-[#d4af37]'
							>
								Написать в Telegram
							</a>
						</SheetClose>
					</div>
				</SheetContent>

				<div className='pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4'>
					<div className='pointer-events-auto w-full max-w-3xl'>
						<CookieConsent />
					</div>
				</div>
			</main>
		</Sheet>
	)
}
