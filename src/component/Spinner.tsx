import type { FC } from 'react';
import styles from './spinner.module.css';

const Spinner: FC<{ width?: number; height?: number }> = ({ width, height }) => {
	return (
		<svg width={width ?? 24} height={height ?? 24} className={styles.spinner} viewBox="0 0 50 50">
			<circle className={styles.path} cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
		</svg>
	);
};

export default Spinner;
