document.addEventListener('DOMContentLoaded', () => {
    // 모달 제어
    const modals = document.querySelectorAll('.modal');
    const modalOpenButtons = document.querySelectorAll('.modal-open-btn');
    const closeModalButtons = document.querySelectorAll('.close');

    // 열기
    modalOpenButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.dataset.modal;
            document.getElementById(modalId).style.display = 'flex';
        });
    });

    // 닫기
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });

    // 공통 계산 함수
    const calculateTax = (assetValue, taxRate, additionalCosts) => {
        const educationTaxRate = 0.1; // 지방교육세율
        const ruralTaxRate = 0.2; // 농어촌특별세율

        const acquisitionTax = Math.floor(assetValue * taxRate);
        const educationTax = Math.floor(acquisitionTax * educationTaxRate);
        const ruralTax = Math.floor(acquisitionTax * ruralTaxRate);
        const totalTax = acquisitionTax + educationTax + ruralTax + additionalCosts;

        return { acquisitionTax, educationTax, ruralTax, totalTax };
    };

    // 재산 유형별 필드 표시
    const handleAssetTypeChange = (modalId) => {
        const assetType = document.querySelector(`#${modalId} select[id$="AssetType"]`);
        const fields = {
            realEstate: document.querySelector(`#${modalId} .realEstateField`),
            vehicle: document.querySelector(`#${modalId} .vehicleField`),
            other: document.querySelector(`#${modalId} .otherField`),
        };

        assetType.addEventListener('change', () => {
            Object.values(fields).forEach(field => field.style.display = 'none');
            fields[assetType.value].style.display = 'block';
        });
    };

    // 매매 모달 계산
    document.getElementById('calculateSaleTax').addEventListener('click', () => {
        const modalId = 'modalSale';
        const assetType = document.querySelector(`#${modalId} select[id$="AssetType"]`).value;
        let assetValue = 0;
        let taxRate = 0;

        if (assetType === 'realEstate') {
            assetValue = parseInt(document.getElementById('saleRealEstateValue').value.replace(/,/g, '') || '0', 10);
            const realEstateType = document.getElementById('saleRealEstateType').value;

            // 부동산 종류에 따른 취득세율
            switch (realEstateType) {
                case 'residential1':
                    taxRate = assetValue <= 100000000 ? 0.01 : assetValue <= 600000000 ? 0.015 : 0.03;
                    break;
                case 'residentialMulti':
                    taxRate = 0.08;
                    break;
                case 'commercial':
                    taxRate = 0.04;
                    break;
                case 'land':
                    taxRate = 0.04;
                    break;
            }
        } else if (assetType === 'vehicle') {
            assetValue = parseInt(document.getElementById('saleVehiclePrice').value.replace(/,/g, '') || '0', 10);
            const vehicleType = document.getElementById('saleVehicleType').value;

            // 차량 종류에 따른 취득세율
            taxRate = vehicleType === 'compact' ? 0.05 : 0.07;
        } else if (assetType === 'other') {
            assetValue = parseInt(document.getElementById('saleOtherAssetValue').value.replace(/,/g, '') || '0', 10);
            taxRate = 0.03; // 기타 자산: 3%
        }

        const additionalCosts = parseInt(document.getElementById('saleAdditionalCosts').value.replace(/,/g, '') || '0', 10);
        const { acquisitionTax, educationTax, ruralTax, totalTax } = calculateTax(assetValue, taxRate, additionalCosts);

        document.getElementById('result').innerHTML = `
            <h3>매매 계산 결과</h3>
            <p>취득세: ${acquisitionTax.toLocaleString()} 원</p>
            <p>지방교육세: ${educationTax.toLocaleString()} 원</p>
            <p>농어촌특별세: ${ruralTax.toLocaleString()} 원</p>
            <p>기타 비용: ${additionalCosts.toLocaleString()} 원</p>
            <p><strong>총 세금: ${totalTax.toLocaleString()} 원</strong></p>
        `;
    });

    // 모달별 재산 유형 필드 동작 설정
    ['modalSale', 'modalGift', 'modalInheritance', 'modalOriginal'].forEach(modalId => {
        handleAssetTypeChange(modalId);
    });
});
