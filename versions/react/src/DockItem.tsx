import useRaf from '@rooks/use-raf';
import { motion, type MotionValue, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AppID } from './types';

type DockItemProps = {
	mouse_x: MotionValue<number | null>;
	app_id: AppID;
};

const base_width = 57.6;
const distance_limit = base_width * 6;
const beyond_the_distance_limit = distance_limit + 1;
const distance_input = [
	-distance_limit,
	-distance_limit / 1.25,
	-distance_limit / 2,
	0,
	distance_limit / 2,
	distance_limit / 1.25,
	distance_limit,
];
const width_output = [
	base_width,
	base_width * 1.1,
	base_width * 1.414,
	base_width * 2,
	base_width * 1.414,
	base_width * 1.1,
	base_width,
];

export function DockItem({ mouse_x, app_id }: DockItemProps) {
	const img_ref = useRef<HTMLImageElement>(null);

	const distance = useMotionValue(beyond_the_distance_limit);

	const width_px: MotionValue<number> = useSpring(
		useTransform(distance, distance_input, width_output),
		{
			stiffness: 1300,
			damping: 82,
		}
	);

	const width = useTransform(width_px, (width) => `${width / 16}rem`);

	useRaf(() => {
		const el = img_ref.current;
		const mouse_x_val = mouse_x.get();
		if (el && mouse_x_val !== null) {
			const rect = el.getBoundingClientRect();

			const img_center_x = rect.left + rect.width / 2;

			// difference between the x coordinate value of the mouse pointer
			// and the img center x coordinate value
			const distance_delta = mouse_x_val - img_center_x;
			distance.set(distance_delta);
			return;
		}

		distance.set(beyond_the_distance_limit);
	}, true);

	return (
		<section>
			<button className='dock-button'>
				<motion.img
					ref={img_ref}
					className='app-icon'
					src={`/app-icons/${app_id}/256.png`}
					draggable={false}
					style={{ width, willChange: 'width' }}
				/>
			</button>
		</section>
	);
}
