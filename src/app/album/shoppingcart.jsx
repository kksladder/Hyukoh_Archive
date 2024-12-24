import React, { useState } from 'react';
import Select from 'react-select';

const CartSection = () => {
    const [selectedQuantity, setSelectedQuantity] = useState(null);

    const quantityOptions = [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' },
    ];

    const handleAddToCart = () => {
        if (selectedQuantity) {
            alert(`장바구니에 ${selectedQuantity.value}개의 아이템이 추가되었습니다.`);
        } else {
            alert('수량을 선택해주세요.');
        }
    };

    return (
        <div className='bg-gray-800 text-white p-6 mt-6 rounded-lg'>
            <h2 className='text-xl font-semibold mb-4'>장바구니</h2>
            <div className='flex flex-col gap-4'>
                {/* React Select */}
                <div>
                    <Select
                        options={quantityOptions}
                        placeholder='수량 선택'
                        onChange={(selectedOption) => setSelectedQuantity(selectedOption)}
                        className='text-black'
                    />
                </div>

                {/* Buttons */}
                <div className='flex gap-4'>
                    <button className='bg-gray-400 text-white px-4 py-2 rounded-md' onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                    <button className='bg-black text-white px-4 py-2 rounded-md'>Keep Shopping</button>
                </div>
            </div>
        </div>
    );
};

export default CartSection;
