document.addEventListener('DOMContentLoaded', () => {
    // 재산 유형 선택 필드
    const assetType = document.getElementById('assetType');
    const fields = {
        realEstate: document.getElementById('realEstateField'),
        vehicle: document.getElementById('vehicleField'),
        other: document.getElementById('otherField'),
    };

    // 재산 유형 선택 이벤트: 선택된 필드만 보이도록 설정
    assetType.addEventListener('change', () => {
        Object.values(fields).forEach(field => field.style.display = 'none'); // 모든 필드 숨김
        fields[assetType.value].style.display = 'block'; // 선택된 필드만 표시
    });

    // 계산 버튼 클릭 이벤트
    document.getElementById('calculateButton').addEventListener('click', () => {
        let assetValue = 0; // 자산 금액 초기화
        let taxRate = 0; // 취득세율 초기화
        const educationTaxRate = 0.1; // 지방교육세율 (10%)
        const ruralTaxRate = 0.2; // 농어촌특별세율 (20%)

        // 재산 유형이 "부동산"인 경우
        if (assetType.value === 'realEstate') {
            assetValue = parseInt(document.getElementById('realEstateValue').value.replace(/,/g, '') || '0', 10);
            const realEstateType = document.getElementById('realEstateType').value;

            // 부동산 종류에 따른 취득세율 설정
            switch (realEstateType) {
                case 'residential1': // 1세대 1주택
                    taxRate = assetValue <= 100000000 ? 0.01 : assetValue <= 600000000 ? 0.015 : 0.03;
                    break;
                case 'residentialMulti': // 다주택
                    taxRate = 0.08;
                    break;
                case 'commercial': // 상업용
                case 'land': // 토지
                    taxRate = 0.04;
                    break;
            }
        }
        // 재산 유형이 "차량"인 경우
        else if (assetType.value === 'vehicle') {
            assetValue = parseInt(document.getElementById('vehiclePrice').value.replace(/,/g, '') || '0', 10);
            const vehicleType = document.getElementById('vehicleType').value;

            // 차량 종류에 따른 취득세율 설정
            taxRate = vehicleType === 'compact' ? 0.05 : 0.07; // 경차: 5%, 일반 차량: 7%
        }
        // 재산 유형이 "기타"인 경우
        else if (assetType.value === 'other') {
            assetValue = parseInt(document.getElementById('otherAssetValue').value.replace(/,/g, '') || '0', 10);
            taxRate = 0.03; // 기타 자산의 취득세율: 3%
        }

        // 세금 계산
        const acquisitionTax = Math.floor(assetValue * taxRate); // 취득세
        const educationTax = Math.floor(acquisitionTax * educationTaxRate); // 지방교육세
        const ruralTax = Math.floor(acquisitionTax * ruralTaxRate); // 농어촌특별세
        const totalTax = acquisitionTax + educationTax + ruralTax; // 총 세금

        // 결과 출력
        document.getElementById('result').innerHTML = `
            <h3>계산 결과</h3>
            <p>취득세: ${acquisitionTax.toLocaleString()} 원</p>
            <p>지방교육세: ${educationTax.toLocaleString()} 원</p>
            <p>농어촌특별세: ${ruralTax.toLocaleString()} 원</p>
            <p><strong>총 세금: ${totalTax.toLocaleString()} 원</strong></p>
        `;
    });
});
