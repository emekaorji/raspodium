const LoaderIcon = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		xmlnsXlink='http://www.w3.org/1999/xlink'
		width='211px'
		height='211px'
		style={{ transition: 'none' }}
		viewBox='0 0 100 100'
		preserveAspectRatio='xMidYMid'>
		<defs>
			<filter
				id='balls'
				x='-100%'
				y='-100%'
				width='300%'
				height='300%'
				colorInterpolationFilters='sRGB'>
				<feGaussianBlur in='SourceGraphic' stdDeviation='3.2'></feGaussianBlur>
				<feComponentTransfer result='cutoff'>
					<feFuncA type='table' tableValues='0 0 0 0 0 0 1 1 1 1 1'></feFuncA>
				</feComponentTransfer>
			</filter>
		</defs>

		<g filter='url(#balls)'>
			<g transform='translate(50 50)'>
				<g>
					<circle cx='37' cy='0' r='5' fill='currentColor'>
						<animate
							attributeName='r'
							keyTimes='0;0.5;1'
							values='4.8;11.2;4.8'
							dur='4s'
							repeatCount='indefinite'
							begin='-0.25s'></animate>
					</circle>
					<animateTransform
						attributeName='transform'
						type='rotate'
						keyTimes='0;1'
						values='0;360'
						dur='4s'
						repeatCount='indefinite'
						begin='0s'></animateTransform>
				</g>
			</g>

			<g transform='translate(50 50)'>
				<g>
					<circle cx='37' cy='0' r='5' fill='currentColor'>
						<animate
							attributeName='r'
							keyTimes='0;0.5;1'
							values='4.8;11.2;4.8'
							dur='2s'
							repeatCount='indefinite'
							begin='-0.20833333333333334s'></animate>
					</circle>
					<animateTransform
						attributeName='transform'
						type='rotate'
						keyTimes='0;1'
						values='0;360'
						dur='2s'
						repeatCount='indefinite'
						begin='-0.041666666666666664s'></animateTransform>
				</g>
			</g>

			<g transform='translate(50 50)'>
				<g>
					<circle cx='37' cy='0' r='5' fill='currentColor'>
						<animate
							attributeName='r'
							keyTimes='0;0.5;1'
							values='4.8;11.2;4.8'
							dur='1.3333333333333333s'
							repeatCount='indefinite'
							begin='-0.16666666666666666s'></animate>
					</circle>
					<animateTransform
						attributeName='transform'
						type='rotate'
						keyTimes='0;1'
						values='0;360'
						dur='1.3333333333333333s'
						repeatCount='indefinite'
						begin='-0.08333333333333333s'></animateTransform>
				</g>
			</g>

			<g transform='translate(50 50)'>
				<g>
					<circle cx='37' cy='0' r='5' fill='currentColor'>
						<animate
							attributeName='r'
							keyTimes='0;0.5;1'
							values='4.8;11.2;4.8'
							dur='1s'
							repeatCount='indefinite'
							begin='-0.125s'></animate>
					</circle>
					<animateTransform
						attributeName='transform'
						type='rotate'
						keyTimes='0;1'
						values='0;360'
						dur='1s'
						repeatCount='indefinite'
						begin='-0.125s'></animateTransform>
				</g>
			</g>

			<g transform='translate(50 50)'>
				<g>
					<circle cx='37' cy='0' r='5' fill='currentColor'>
						<animate
							attributeName='r'
							keyTimes='0;0.5;1'
							values='4.8;11.2;4.8'
							dur='0.8s'
							repeatCount='indefinite'
							begin='-0.08333333333333333s'></animate>
					</circle>
					<animateTransform
						attributeName='transform'
						type='rotate'
						keyTimes='0;1'
						values='0;360'
						dur='0.8s'
						repeatCount='indefinite'
						begin='-0.16666666666666666s'></animateTransform>
				</g>
			</g>

			<g transform='translate(50 50)'>
				<g>
					<circle cx='37' cy='0' r='5' fill='currentColor'>
						<animate
							attributeName='r'
							keyTimes='0;0.5;1'
							values='4.8;11.2;4.8'
							dur='0.6666666666666666s'
							repeatCount='indefinite'
							begin='-0.041666666666666664s'></animate>
					</circle>
					<animateTransform
						attributeName='transform'
						type='rotate'
						keyTimes='0;1'
						values='0;360'
						dur='0.6666666666666666s'
						repeatCount='indefinite'
						begin='-0.20833333333333334s'></animateTransform>
				</g>
			</g>
		</g>
	</svg>
);

export default LoaderIcon;
