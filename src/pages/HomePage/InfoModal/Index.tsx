import { IDummyUsers } from "../DataTable";
import s from "./InfoModal.module.scss"

interface InfoModalProps {
    user: IDummyUsers;
    onModalOpened: (index: number) => void;
    index: number;
}

const keys = ["firstName", "lastName", "maidenName", "age", "email", "address", "phone", "height", "weight"]

const InfoModal: React.FC<InfoModalProps> = (props) => {
    return (
        <div className={s.modalBody}>

            <div>
                <span onClick={() => props.onModalOpened(props.index)} className={s.exit}>X</span>
                {Object.keys(props.user).map(key => { return ((keys.includes(key) && key !== 'address') ? (<span key={key}>{key}: {props.user[key]}</span>) : ((key == 'address') && <span> address: {props.user["address"]["city"]}, {props.user["address"]["address"]}</span>)) })}</div>
        </div>
    );
}

export default InfoModal;