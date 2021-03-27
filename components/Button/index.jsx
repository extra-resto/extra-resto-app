import styles from './Button.module.scss';

const Button = ({content, href}) => {
    
    return (
        <button className={styles.Button} onClick={href}>{content}</button>
        
    )
}

export default Button;