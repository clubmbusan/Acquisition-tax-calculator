document.addEventListener('DOMContentLoaded', () => {
    const assetType = document.getElementById('assetType');
    const fields = {
        realEstate: document.getElementById('realEstateField'),
        vehicle: document.getElementById('vehicleField'),
        other: document.getElementById('otherField'),
    };

    // 재산 유형 선택 이벤트
    assetType.addEventListener('change', () => {
        Object.values(fields).forEach(field => field.style.display = 'none');
        fields[assetType.value].style.display = 'block';
    });

    // 계산 버튼 클릭 이벤트
    document.getElementById('calculateButton').addEventListener('click', () => {
        const additionalCosts = parseInt(document.getElementById('additionalCosts').value.replace(/,/g, '') || '0', 10);

        let assetValue = 0;
        let taxRate = 0;
        let educationTaxRate = 0.1; // 지방교육세율
        let ruralTaxRate = 0.2; // 농어촌특별세율

        if (assetType.value === 'realEstate') {
            assetValue = parseInt(document.getElementById('realEstateValue').value.replace(/,/g, '') || '0', 10);
            const realEstateType = document.getElementById('realEstateType').value;

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
        } else if (assetType.value === 'vehicle') {
            assetValue = parseInt(document.getElementById('vehiclePrice').value.replace(/,/g, '') || '0', 10);
            const vehicleType = document.getElementById('vehicleType').value;

            // 차량 종류에 따른 취득세율
            taxRate = vehicleType === 'compact' ? 0.05 : 0.07;
        } else if (assetType.value === 'other') {
            assetValue = parseInt(document.getElementById('otherAssetValue').value.replace(/,/g, '') || '0', 10);
            taxRate = 0.03; // 기타 자산: 3%
        }

        // 세금 계산
        const acquisitionTax = Math.floor(assetValue * taxRate);
        const educationTax = Math.floor(acquisitionTax * educationTaxRate);
        const ruralTax = Math.floor(acquisitionTax * ruralTaxRate);
        const totalTax = acquisitionTax + educationTax + ruralTax + additionalCosts;

        document.getElementById('result').innerHTML = `
             <h3>계산 결과</h3>
             <p>취득세: ${acquisitionTax.toLocaleString()} 원</p>
             <p>지방교육세: ${educationTax.toLocaleString()} 원</p>
             <p>농어촌특별세: ${ruralTax.toLocaleString()} 원</p>
             <p>기타 비용: ${additionalCosts.toLocaleString()} 원</p>
             <p><strong>총 세금: ${totalTax.toLocaleString()} 원</strong></p>
          `;
        
    });
});
