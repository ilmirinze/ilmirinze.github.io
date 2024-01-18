import { useEffect, useState } from "react";
import s from './DataTable.module.scss'
import InfoModal from "./InfoModal/Index";

export interface IDummyUsers {
    id: number,
    firstName: string,
    lastName: string,
    maidenName: string,
    age: number,
    gender: string,
    phone: string,
    address: {
        address: string,
        city: string,
    }
    height: number,
    weight: number,
    email: string,
}

const DataTable: React.FC = () => {
    const [dummyUsers, setDummyUsers] = useState<IDummyUsers[]>([]);
    const [searchResult, setSearcResult] = useState<string>('');
    const [modalOpened, setModalOpened] = useState<boolean[]>([]);

    useEffect(() => {
        fetch('https://dummyjson.com/users', {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => res.json())
            .then(data => {
                setDummyUsers(data.users);
            })
            .then(error => console.log(error));
    }, [])

    useEffect(() => {
        fetch(`https://dummyjson.com/users/search?q=${searchResult}`, {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => res.json())
            .then(data => {
                setDummyUsers(data.users);
            })
            .then(error => console.log(error));
    }, [searchResult])

    useEffect(() => {
        setModalOpened(Array.from({ length: dummyUsers.length }, () => false));
    }, [dummyUsers])

    const onModalOpened = (index: number) => {
        const tempArr = [...modalOpened];
        tempArr[index] = !tempArr[index];
        setModalOpened(tempArr);
        console.log(modalOpened)
    }
    const onSearch = (value: string) => {
        setSearcResult(value)
    }
    return (
        <div className={s.tableBody}>
            {dummyUsers.map((user, index) => {
                return (modalOpened[index] && (<InfoModal user={user} onModalOpened={onModalOpened} index={index}/>))
            })}

            <div className={s.searchInput}><input type="text" value={searchResult} placeholder="Поиск..." onChange={(e) => onSearch(e.target.value)} /></div>
            <div className={s.table}>
                <div className={s.tableHeader}>
                    <div>ФИО</div>
                    <div>Возраст</div>
                    <div>Пол</div>
                    <div>Телефон</div>
                    <div>Адрес</div>
                </div>
                <div className={s.dataContainer}>
                    {dummyUsers.map((user, index) => {
                        return (
                            <div key={index} className={s.tableRow} onClick={() => onModalOpened(index)}>

                                <div key={index + user.firstName} >{user.firstName} {user.lastName} {user.maidenName}</div>
                                <div key={index + user.age} >{user.age}</div>
                                <div key={index + user.gender} >{user.gender}</div>
                                <div key={index + user.phone} >{user.phone}</div>
                                <div key={index + user.address.city} >{user.address.city} {user.address.address}</div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>

    );
}

export default DataTable;