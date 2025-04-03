import React from 'react';
import styles from './Container.module.css'; // Ensure the path is correct

function Container(props) {
    return (
        <div className={`${styles.container} ${styles.min_height}`}>
            {props.children}
        </div>
    );
}

export default Container;
