const POLICY_UPDATED_AT = '20 февраля 2026 года'
const OPERATOR_NAME = 'Индивидуальный предприниматель Галеев Артур Радикович'
const OPERATOR_INN = '027410843056'
const OPERATOR_EMAIL = 'info@theaterartgaley.fun'
const OPERATOR_PHONE = '+7 (965) 607-16-42'
const SITE_URL = 'https://theaterartgaley.fun'

const processingRows = [
	{
		purpose: 'Работа сайта и безопасность',
		data: 'Технические и сессионные данные',
		basis: 'ч. 1 ст. 6 (исполнение функций оператора, законный интерес)',
		retention: 'До достижения цели, далее удаление/обезличивание',
	},
	{
		purpose: 'Обратная связь с пользователем',
		data: 'Контакты и содержание обращения',
		basis: 'ч. 1 ст. 6, ст. 9 (согласие/инициатива субъекта)',
		retention: 'До ответа и завершения взаимодействия, либо по закону',
	},
	{
		purpose: 'Вход в админ-раздел и управление доступом',
		data: 'Профиль OAuth, роль, данные сессии',
		basis: 'ч. 1 ст. 6 (исполнение договора/функций), ст. 19',
		retention: 'На период действия доступа и сессии',
	},
	{
		purpose: 'Веб-аналитика и улучшение сайта',
		data: 'Cookie/идентификаторы, поведение на сайте',
		basis: 'ч. 1 ст. 6, ст. 9',
		retention: 'Сроки определяются целями анализа и настройками сервиса',
	},
] as const

function ExternalLawLink({
	href,
	children,
}: {
	href: string
	children: string
}) {
	return (
		<a
			href={href}
			target='_blank'
			rel='noreferrer'
			className='text-[#d4af37] underline decoration-[#d4af37]/40 underline-offset-4 transition-colors hover:text-[#e6c459]'
		>
			{children}
		</a>
	)
}

export default function PrivacyPage() {
	return (
		<main className='min-h-screen bg-[radial-gradient(circle_at_15%_0%,rgba(212,175,55,0.14),transparent_34%),linear-gradient(180deg,#050505_0%,#090909_52%,#050505_100%)] text-slate-200'>
			<div className='mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16'>
				<header className='rounded-3xl border border-white/10 bg-black/40 p-5 shadow-[0_24px_70px_-45px_rgba(0,0,0,0.95)] backdrop-blur-sm sm:p-7 lg:p-8'>
					<p className='text-[11px] uppercase tracking-[0.22em] text-[#d4af37]'>
						Документ оператора персональных данных
					</p>
					<h1 className='mt-3 [font-family:var(--font-cormorant)] text-3xl leading-tight text-white sm:text-5xl lg:text-6xl'>
						Политика в отношении обработки персональных данных
					</h1>
					<p className='mt-5 max-w-4xl text-sm leading-relaxed text-slate-300 sm:text-base'>
						Документ применим к сайту{' '}
						<a
							href={SITE_URL}
							target='_blank'
							rel='noreferrer'
							className='underline decoration-white/35 underline-offset-4 transition-colors hover:text-white'
						>
							{SITE_URL}
						</a>{' '}
						и отражает подход к обработке персональных данных в соответствии с
						законодательством Российской Федерации.
					</p>
					<div className='mt-6 flex flex-wrap gap-2'>
						<span className='rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-slate-300 sm:text-[10px]'>
							Актуально на: {POLICY_UPDATED_AT}
						</span>
						<span className='rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-slate-300 sm:text-[10px]'>
							Редакция действует с: {POLICY_UPDATED_AT}
						</span>
					</div>
				</header>

				<div className='mt-6 grid gap-4 lg:grid-cols-3'>
					<section className='rounded-2xl border border-white/10 bg-black/30 p-5 lg:col-span-1'>
						<h2 className='text-sm uppercase tracking-[0.18em] text-[#d4af37]'>
							Оператор
						</h2>
						<div className='mt-4 space-y-2 text-sm leading-relaxed text-slate-300'>
							<p>{OPERATOR_NAME}</p>
							<p>ИНН: {OPERATOR_INN}</p>
							<p>
								<a
									href={`mailto:${OPERATOR_EMAIL}`}
									className='underline decoration-white/35 underline-offset-4'
								>
									{OPERATOR_EMAIL}
								</a>
							</p>
							<p>
								<a
									href='tel:+79656071642'
									className='underline decoration-white/35 underline-offset-4'
								>
									{OPERATOR_PHONE}
								</a>
							</p>
						</div>
					</section>

					<section className='rounded-2xl border border-white/10 bg-black/30 p-5 lg:col-span-2'>
						<h2 className='text-sm uppercase tracking-[0.18em] text-[#d4af37]'>
							Нормативная база (РФ)
						</h2>
							<ul className='mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300 marker:text-[#d4af37]'>
								<li>
									Федеральный закон от 27.07.2006 № 152-ФЗ «О персональных данных»
									(ред. от 24.06.2025).
								</li>
								<li>
									Политика размещается в открытом доступе в сети Интернет в
									соответствии с ч. 2 ст. 18.1 152-ФЗ.
								</li>
								<li>
									С 01.09.2025 действует правило о том, что согласие на обработку
									ПД должно оформляться отдельно от иных документов
									(Федеральный закон от 24.06.2025 № 156-ФЗ).
							</li>
							<li>
								Постановление Правительства РФ от 01.11.2012 № 1119
								(требования к защите ПД при их обработке в ИСПДн).
							</li>
							<li>
								Федеральный закон от 27.07.2006 № 149-ФЗ «Об информации,
								информационных технологиях и о защите информации».
							</li>
						</ul>
					</section>
				</div>

				<section className='mt-6 rounded-2xl border border-white/10 bg-black/30 p-5 sm:p-6'>
					<h2 className='text-sm uppercase tracking-[0.18em] text-[#d4af37]'>
						Какие данные обрабатываются
					</h2>
					<div className='mt-4 grid gap-4 md:grid-cols-2'>
						<div className='rounded-xl border border-white/10 bg-black/35 p-4'>
							<h3 className='text-xs uppercase tracking-[0.16em] text-slate-400'>
								Посетители сайта
							</h3>
							<ul className='mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-300 marker:text-[#d4af37]'>
								<li>
									Технические данные веб-аналитики: cookie/идентификаторы,
									адрес страницы, реферер, тип браузера и устройства, данные о
									взаимодействии со страницами.
								</li>
								<li>
									Данные, формируемые при использовании файлов cookie и
									локального хранилища браузера.
								</li>
							</ul>
						</div>

						<div className='rounded-xl border border-white/10 bg-black/35 p-4'>
							<h3 className='text-xs uppercase tracking-[0.16em] text-slate-400'>
								Коммуникации и админ-доступ
							</h3>
							<ul className='mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-300 marker:text-[#d4af37]'>
								<li>
									При обращениях: имя/ник, контакт и содержание сообщения.
								</li>
								<li>
									Для входа в админ-раздел через OAuth: имя, e-mail, идентификатор
									аккаунта, аватар (если передается провайдером), роль доступа.
								</li>
								<li>
									Для сессий: токен сессии, IP-адрес, User-Agent, время создания и
									истечения.
								</li>
							</ul>
						</div>
					</div>
					<p className='mt-4 text-sm leading-relaxed text-slate-300'>
						Оператор не обрабатывает специальные категории персональных данных
						(ст. 10 152-ФЗ) и биометрические персональные данные (ст. 11 152-ФЗ)
						в рамках обычного использования сайта.
					</p>
				</section>

				<section className='mt-6 rounded-2xl border border-white/10 bg-black/30 p-5 sm:p-6'>
					<h2 className='text-sm uppercase tracking-[0.18em] text-[#d4af37]'>
						Цели и правовые основания обработки
					</h2>
					<div className='mt-4 space-y-3 md:hidden'>
						{processingRows.map(row => (
							<article
								key={row.purpose}
								className='rounded-xl border border-white/10 bg-black/35 p-4'
							>
								<p className='text-xs uppercase tracking-[0.16em] text-[#d4af37]'>
									Цель
								</p>
								<p className='mt-1 text-base leading-relaxed text-white'>
									{row.purpose}
								</p>
								<div className='mt-3 h-px w-full bg-white/10' />
								<p className='mt-3 text-xs uppercase tracking-[0.16em] text-slate-400'>
									Категории данных
								</p>
								<p className='mt-1 text-sm leading-relaxed text-slate-300'>
									{row.data}
								</p>
								<p className='mt-3 text-xs uppercase tracking-[0.16em] text-slate-400'>
									Основание (152-ФЗ)
								</p>
								<p className='mt-1 text-sm leading-relaxed text-slate-300'>
									{row.basis}
								</p>
								<p className='mt-3 text-xs uppercase tracking-[0.16em] text-slate-400'>
									Срок обработки
								</p>
								<p className='mt-1 text-sm leading-relaxed text-slate-300'>
									{row.retention}
								</p>
							</article>
						))}
					</div>
					<div className='mt-4 hidden overflow-x-auto md:block'>
						<table className='w-full border-collapse text-left text-sm'>
							<thead>
								<tr className='border-b border-white/10 text-xs uppercase tracking-[0.14em] text-slate-400'>
									<th className='px-3 py-3'>Цель</th>
									<th className='px-3 py-3'>Категории данных</th>
									<th className='px-3 py-3'>Основание (152-ФЗ)</th>
									<th className='px-3 py-3'>Срок обработки</th>
								</tr>
							</thead>
							<tbody className='align-top text-slate-300'>
								{processingRows.map((row, index) => (
									<tr
										key={`${row.purpose}-desktop`}
										className={
											index === processingRows.length - 1
												? ''
												: 'border-b border-white/10'
										}
									>
										<td className='px-3 py-3'>{row.purpose}</td>
										<td className='px-3 py-3'>{row.data}</td>
										<td className='px-3 py-3'>{row.basis}</td>
										<td className='px-3 py-3'>{row.retention}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</section>

				<section className='mt-6 rounded-2xl border border-white/10 bg-black/30 p-5 sm:p-6'>
					<h2 className='text-sm uppercase tracking-[0.18em] text-[#d4af37]'>
						Cookie, аналитика и внешние сервисы
					</h2>
					<ul className='mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300 marker:text-[#d4af37]'>
						<li>
							Сайт использует cookie и сервис веб-аналитики Яндекс.Метрика.
						</li>
						<li>
							Пользователь может запретить cookie в настройках браузера; это может
							повлиять на корректность работы отдельных функций сайта.
						</li>
						<li>
							Ссылки на внешние площадки (например, билетные сервисы, Telegram,
							VK, WhatsApp) ведут к самостоятельным операторам данных, которые
							обрабатывают сведения по своим правилам.
						</li>
						<li>
							При планировании трансграничной передачи ПД оператор применяет
							требования ст. 12 152-ФЗ.
						</li>
					</ul>
				</section>

				<section className='mt-6 rounded-2xl border border-white/10 bg-black/30 p-5 sm:p-6'>
					<h2 className='text-sm uppercase tracking-[0.18em] text-[#d4af37]'>
						Локализация и защита персональных данных
					</h2>
					<ul className='mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300 marker:text-[#d4af37]'>
						<li>
							Оператор организует обработку ПД с учетом требований ч. 5 ст. 18
							152-ФЗ (локализация баз данных при сборе ПД граждан РФ через
							интернет).
						</li>
						<li>
							Применяются организационные и технические меры безопасности в
							соответствии со ст. 19 152-ФЗ и Постановлением Правительства РФ
							№ 1119.
						</li>
						<li>
							Доступ к данным предоставляется только уполномоченным лицам в
							объеме, необходимом для выполнения задач.
						</li>
					</ul>
				</section>

				<section className='mt-6 rounded-2xl border border-white/10 bg-black/30 p-5 sm:p-6'>
					<h2 className='text-sm uppercase tracking-[0.18em] text-[#d4af37]'>
						Права субъекта персональных данных
					</h2>
					<ul className='mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300 marker:text-[#d4af37]'>
						<li>Получать сведения об обработке своих персональных данных.</li>
						<li>Требовать уточнения, блокирования или уничтожения данных.</li>
						<li>Отозвать согласие на обработку персональных данных.</li>
						<li>Обжаловать действия оператора в Роскомнадзор или в суд.</li>
					</ul>
					<p className='mt-4 text-sm leading-relaxed text-slate-300'>
						Запросы направляются на{' '}
						<a
							href={`mailto:${OPERATOR_EMAIL}`}
							className='underline decoration-white/35 underline-offset-4'
						>
							{OPERATOR_EMAIL}
						</a>
						. Срок ответа на запрос субъекта, как правило, составляет 10 рабочих
						дней с возможностью продления не более чем на 5 рабочих дней в
						случаях, предусмотренных законом. При отзыве согласия обработка
						прекращается в сроки, установленные 152-ФЗ, если отсутствуют иные
						законные основания для продолжения обработки.
					</p>
				</section>

				<section className='mt-6 rounded-2xl border border-white/10 bg-black/30 p-5 sm:p-6'>
					<h2 className='text-sm uppercase tracking-[0.18em] text-[#d4af37]'>
						Публикация и изменения политики
					</h2>
					<p className='mt-4 text-sm leading-relaxed text-slate-300'>
						Политика опубликована в свободном доступе по адресу{' '}
						<a
							href={`${SITE_URL}/privacy`}
							target='_blank'
							rel='noreferrer'
							className='underline decoration-white/35 underline-offset-4'
						>
							{SITE_URL}/privacy
						</a>
						. Оператор вправе обновлять документ при изменении законодательства
						или бизнес-процессов обработки данных. Новая редакция вступает в силу
						с момента публикации.
					</p>
				</section>

				<section className='mt-6 rounded-2xl border border-white/10 bg-black/30 p-5 sm:p-6'>
					<h2 className='text-sm uppercase tracking-[0.18em] text-[#d4af37]'>
						Ключевые правовые ссылки
					</h2>
					<ul className='mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300 marker:text-[#d4af37]'>
						<li>
							<ExternalLawLink href='https://www.consultant.ru/document/cons_doc_LAW_61801/'>
								152-ФЗ «О персональных данных»
							</ExternalLawLink>
						</li>
						<li>
							<ExternalLawLink href='https://www.consultant.ru/document/cons_doc_LAW_156525/0e39084ac80d38f59f4b3e2423ca6d8f1fe5f35f/'>
								ч. 5 ст. 18 152-ФЗ (локализация баз данных)
							</ExternalLawLink>
						</li>
						<li>
							<ExternalLawLink href='https://www.consultant.ru/document/cons_doc_LAW_61801/d5d1202f3f28620bc3f92f23100f2f7bfc8c9f22/'>
								ст. 12 152-ФЗ (трансграничная передача)
							</ExternalLawLink>
						</li>
						<li>
							<ExternalLawLink href='https://www.consultant.ru/document/cons_doc_LAW_61801/c1e5d162f58f166ac2c4ca6f1ef0427b8c042154/'>
								ст. 21 152-ФЗ (обязанности оператора при обращениях субъекта)
							</ExternalLawLink>
						</li>
						<li>
							<ExternalLawLink href='https://www.consultant.ru/document/cons_doc_LAW_378917/8166f67e81d3c17f93d1f6f8afaf84f5f638f9e4/'>
								Федеральный закон № 156-ФЗ от 24.06.2025
							</ExternalLawLink>
						</li>
						<li>
							<ExternalLawLink href='https://www.consultant.ru/document/cons_doc_LAW_137356/'>
								Постановление Правительства РФ № 1119 от 01.11.2012
							</ExternalLawLink>
						</li>
					</ul>
				</section>
			</div>
		</main>
	)
}
