import style from "./style.module.css"


type DefaultButtonProps = {
    color?: 'green' | 'red';
} & React.ComponentProps<'button'>;

export function DefaultButton({ color = 'green', ...props }: DefaultButtonProps) {

    return (
        <div>
            <button className={`${style.button} ${style[color]}`}  {...props} >
                
            </button>
        </div>
    )

}