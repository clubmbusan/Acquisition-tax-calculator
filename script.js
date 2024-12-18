document.addEventListener('DOMContentLoaded', () => {
    // 모달 열기 및 닫기 기능
    const modalButtons = document.querySelectorAll('.acquisition-btn'); // 모달 여는 버튼
    const modals = document.querySelectorAll('.modal'); // 모든 모달
    const closeButtons = document.querySelectorAll('.close'); // 닫기 버튼

    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.dataset.modal; // 버튼에 설정된 data-modal 속성
            document.getElementById(modalId).style.display = 'block'; // 해당 모달 열기
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none'; // 닫기 버튼 클릭 시 모달 닫기
        });
    });

    // 모달 내 필드 표시 동작
    const handleAssetTypeChange = (modalId) => {
        const assetTypeSelect = document.querySelector(`#${modalId} .assetTypeSelect`);
        const fields = {
            realEstate: document.querySelector(`#${modalId} .realEstateField`),
            vehicle: document.querySelector(`#${modalId} .vehicleField`),
            other: document.querySelector(`#${modalId} .otherField`),
        };

        assetTypeSelect.addEventListener('change', () => {
            Object.values(fields).forEach(field => field.style.display = 'none');
            fields[assetTypeSelect.value].style.display = 'block'; // 선택된 필드 표시
        });
    };

    // 각 모달에 대해 동작 리스너 연결
    ['modalSale', 'modalGift', 'modalInheritance', 'modalOriginal'].forEach(modalId => {
        handleAssetTypeChange(modalId);
    });

    // 계산 버튼 이벤트 리스너
    const calculateTax = (modalId) => {
        const assetType = document.querySelector(`#${modalId} .assetTypeSelect`).value;
        let assetValue = 0;
        let taxRate = 0;

        if (assetType === 'realEstate') {
            assetValue = parseInt(document.querySelector(`#${modalId} .realEstateValue`).value.replace(/,/g, '') || '0', 10);
            taxRate = 0.015; // 예시 세율
        } else if (assetType === 'vehicle') {
            assetValue = parseInt(document.querySelector(`#${modalId} .vehicleValue`).value.replace(/,/g, '') || '0', 10);
            taxRate = 0.05;
        } else if (assetType === 'other') {
            assetValue = parseInt(document.querySelector(`#${modalId} .otherValue`).value.replace(/,/g, '') || '0', 10);
            taxRate = 0.03;
        }

        const acquisitionTax = Math.floor(assetValue * taxRate);
        const totalTax = acquisitionTax;

        document.querySelector(`#${modalId} .result`).innerHTML = `
            <h3>계산 결과</h3>
            <p>취득세: ${acquisitionTax.toLocaleString()} 원</p>
            <p><strong>총 세금: ${totalTax.toLocaleString()} 원</strong></p>
        `;
    };

    // 각 모달에 계산 버튼 연결
    ['modalSale', 'modalGift', 'modalInheritance', 'modalOriginal'].forEach(modalId => {
        document.querySelector(`#${modalId} .calculateButton`).addEventListener('click', () => {
            calculateTax(modalId);
        });
    });
});
