document.addEventListener('DOMContentLoaded', () => {
    // 재산 유형 선택 필드
    const assetType = document.getElementById('assetType');
    const realEstateField = document.getElementById('realEstateField');
    const vehicleField = document.getElementById('vehicleField');
    const otherField = document.getElementById('otherField');

    // 필드 그룹 초기화
    const fields = {
        realEstate: realEstateField,
        vehicle: vehicleField,
        other: otherField,
    };

    // 재산 유형 변경 시 이벤트 처리
    assetType.addEventListener('change', () => {
        // 모든 필드를 숨김
        Object.values(fields).forEach(field => {
            field.style.display = 'none';
        });

        // 선택된 재산 유형의 필드만 표시
        const selectedField = fields[assetType.value];
        if (selectedField) {
            selectedField.style.display = 'block';
        }
    });

    // 초기값 설정 (부동산 필드 표시)
    fields.realEstate.style.display = 'block';
});

   // === 모달 관련 코드 ===
    const giftButton = document.getElementById('giftButton'); // 증여취득 버튼
    const giftModal = document.getElementById('giftModal');   // 증여 모달
    const closeModal = document.getElementById('closeModal'); // 닫기 버튼
    const confirmGiftType = document.getElementById('confirmGiftType'); // 확인 버튼

    // "증여취득" 버튼 클릭 시 모달 열기
    giftButton.addEventListener('click', () => {
        giftModal.style.display = 'flex'; // 모달 표시
    });
  
    // "확인" 버튼 클릭 시 처리
    confirmGiftType.addEventListener('click', () => {
        const giftType = document.getElementById('giftType').value;
        const assetValue = parseInt(document.getElementById('realEstateValue').value.replace(/,/g, '') || '0', 10);

        let taxRate = 0;

        // 증여 종류에 따른 세율 적용
        if (giftType === 'general') {
            taxRate = 0.035; // 일반 증여: 3.5%
        } else if (giftType === 'corporate') {
            taxRate = 0.04; // 법인 증여: 4%
        }

        const acquisitionTax = Math.floor(assetValue * taxRate);

        // 결과 출력
        document.getElementById('result').innerHTML = `
            <h3>계산 결과</h3>
            <p>증여 자산 금액: ${assetValue.toLocaleString()} 원</p>
            <p>취득세: ${acquisitionTax.toLocaleString()} 원</p>
            <p>세율: ${(taxRate * 100).toFixed(1)}%</p>
        `;

        // 모달 닫기
        giftModal.style.display = 'none';
    });

    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', (e) => {
        if (e.target === giftModal) {
            giftModal.style.display = 'none';
        }
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
