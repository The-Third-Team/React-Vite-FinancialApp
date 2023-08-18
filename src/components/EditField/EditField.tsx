import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";

import { MdModeEditOutline } from 'react-icons/md';


interface Expense {
    title: string,
    budget: number,
    id: number
}

interface Properties {
    // The category title
    category: string,
    // The data array of Expense objects
    data: Expense[],
    // Callback method for when saving
    onSave: (updatedData: Expense[]) => void
}

const EditField = ({ category, data, onSave }: Properties) => {

    const [ openModal, setOpenModal ] = useState<string | undefined>(); 
    const [editedData, setEditedData] = useState<Expense[]>([...data]); // Initialize with the original data


    const props = { openModal, setOpenModal };
    // const handleInputChange = (index: number, key: keyof Expense, value: Expense[keyof Expense]) => {
    //     const newData = [...editedData];
    //     newData[index][key] = value;
    //     setEditedData(newData);
    // }
    const handleInputChange = (index: number, key: keyof Expense, value: number) => {
        const newData = [...editedData];
        let expenseToUpdate = newData[index];
        expenseToUpdate.budget = value;
        setEditedData(newData);
    }

    const handleSave = () => {
        onSave(editedData);
        setOpenModal(undefined);
    }

    return (
        <>
        <Button onClick={ () => props.setOpenModal('pop-up') } className={'w-[2rem] border-none text-black'}>
            <MdModeEditOutline size={ 20 } />
        </Button>
        <Modal className={ 'bg-indigo-950/50' } show={props.openModal === 'pop-up'} size="sm" popup onClose={() => props.setOpenModal(undefined)}>
            <Modal.Header />
            <Modal.Body className={ 'max-w-sm p-6 pt-0 bg-white rounded-lg' }>
                <h3 className={ 'mb-5 text-lg text-center font-normal text-gray-500 dark:text-gray-400' }>{ category }</h3>
                <div className="max-h-[15rem] overflow-auto flex flex-col justify-center gap-4 pt-10 z-50">
                    { data.map((expense, index) => (
                        <div className={ 'flex justify-between w-full' } key={ index }>
                            <p className={ 'flex items-center' }>{ expense.title }</p>
                            <div>
                                <input className={ 'max-w-[4rem] rounded text-center' } type="text" placeholder={ expense.budget.toString() } onChange={(e) => handleInputChange(index, 'budget', parseInt(e.target.value))}/>
                            </div>
                        </div>
                    )) }
                </div>
                <Button className={ 'w-full mt-5 bg-red-500' } onClick={() => handleSave()}>Save</Button>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default EditField;