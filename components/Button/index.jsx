import styles from './Button.module.scss';

const Button = ({content}) => {
    
    return (
        <>
        <div className={styles.container}>
        <button className={styles.container__btn10}>{content}</button>
        </div>
        </>
        
    )
}

export default Button;