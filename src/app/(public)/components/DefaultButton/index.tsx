import style from "./styles.module.css"

type DefaultButtonProps = {
    text: string;
    color?: 'green' | 'red';
} & React.ComponentProps<'button'>;

export function DefaultButton({ color = 'green', text,...props }: DefaultButtonProps) {

    return (
        <div>
            <button className={`${style.button} ${style[color]}`}  {...props} >
                
            {text}</button>
        </div>
    )

}