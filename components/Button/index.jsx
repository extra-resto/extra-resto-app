import styles from './Button.module.scss';

const Button = ({content, href}) => {
    
    return (
        <button className={styles.btn10} onClick={href}>{content}</button>
        
    )
}

export default Button;