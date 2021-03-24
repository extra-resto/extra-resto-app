import styles from './Button.module.scss';

const Button = ({content}) => {
    
    return (
        <>
        <button className={styles.btn10}>{content}</button>
        </>
        
    )
}

export default Button;