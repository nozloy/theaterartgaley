// app/privacy/page.tsx

export default function PrivacyPage() {
	return (
		<main className='mx-auto max-w-md px-4 py-6 text-sm text-foreground'>
			<h1 className='text-2xl font-bold mb-4 text-center'>
				Политика конфиденциальности
			</h1>

			<section className='mb-6'>
				<p>
					Сайт{' '}
					<a
						href='https://theaterartgaley.fun'
						className='text-red-600 underline'
					>
						theaterartgaley.fun
					</a>{' '}
					не осуществляет автоматизированный сбор и обработку персональных
					данных посетителей.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-lg font-semibold mb-2'>🔗 Внешние ссылки</h2>
				<p>
					На сайте размещены ссылки на социальные сети, мессенджеры и сервис
					продажи билетов. Переход по ним осуществляется только по инициативе
					пользователя. Персональные данные при этом обрабатываются
					соответствующими сервисами на основании их собственных политик.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-lg font-semibold mb-2'>
					💬 Переписка и хранение данных
				</h2>
				<p>
					Если вы связываетесь с нами по электронной почте, через мессенджеры
					или социальные сети, предоставленные вами контактные данные (например,
					имя, e-mail, аккаунт, содержание переписки) хранятся исключительно с
					целью ответа на ваш запрос или ведения переписки.
				</p>
				<p className='mt-2'>
					Эти данные не передаются третьим лицам, не публикуются и не
					используются для маркетинга без вашего согласия, за исключением
					случаев, предусмотренных законом.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-lg font-semibold mb-2'>
					📊 Сбор аналитики (cookies)
				</h2>
				<p>
					Сайт может использовать обезличенные cookie и технологии аналитики
					(Яндекс.Метрика) для сбора статистики и улучшения работы сайта. Вы
					можете отключить cookie в настройках браузера.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-lg font-semibold mb-2'>🔒 Ваши права</h2>
				<p>
					Вы имеете право запросить информацию о хранимых персональных данных,
					потребовать их уточнения, блокировки или удаления, а также отозвать
					согласие на их обработку, обратившись по адресу:{' '}
					<a
						href='mailto:info@theaterartgaley.fun'
						className='text-red-600 underline'
					>
						info@theaterartgaley.fun
					</a>
				</p>
			</section>

			<section>
				<h2 className='text-lg font-semibold mb-2'>📌 Обновления политики</h2>
				<p>
					Администрация оставляет за собой право вносить изменения в политику.
					Актуальная версия всегда доступна на этой странице.
				</p>
			</section>
		</main>
	)
}
