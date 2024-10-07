import { useMotionValue } from 'framer-motion';
import { DockItem } from './DockItem';
import { AppID } from './types';

const apps: AppID[] = [
	'calendar',
	'facetime',
	'finder',
	'launchpad',
	'mail',
	'maps',
	'messages',
	'photos',
	'purus-twitter',
	'safari',
	'system-preferences',
	'view-source',
];

export function Dock() {
	const mouse_x = useMotionValue<number | null>(null);

	return (
		<section className='dock-container'>
			<div
				className='dock-el'
				onMouseMove={(event) => mouse_x.set(event.clientX)}
				onMouseLeave={() => mouse_x.set(null)}
			>
				{apps.map((app_id) => (
					<DockItem mouse_x={mouse_x} app_id={app_id} />
				))}
			</div>
		</section>
	);
}
