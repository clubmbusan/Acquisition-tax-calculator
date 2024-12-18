document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.acquisition-btn');
    const propertyTypeLabel = document.getElementById('propertyTypeLabel');
    const propertyType = document.getElementById('propertyType');
    const assetValueLabel = document.getElementById('assetValueLabel');
    const assetValue = document.getElementById('assetValue');

    // 모달 버튼 이벤트 리스너
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const type = button.dataset.type;

            // "매매" 선택 시
            if (type === 'sale') {
                propertyTypeLabel.style.display = 'block';
                propertyType.style.display = 'block';

                assetValueLabel.style.display = 'none';
                assetValue.style.display = 'none';
            }
        });
    });

    // 부동산 종류 선택 이벤트
    propertyType.addEventListener('change', () => {
        if (propertyType.value) {
            assetValueLabel.style.display = 'block';
            assetValue.style.display = 'block';
        } else {
            assetValueLabel.style.display = 'none';
            assetValue.style.display = 'none';
        }
    });

    // 계산 버튼 이벤트
    document.getElementById('calculateButton').addEventListener('click', () => {
        const additionalCosts = parseInt(document.getElementById('additionalCosts').value.replace(/,/g, '') || '0', 10);
        let totalTax = 0;

        if (propertyType.value && assetValue.value) {
            const assetValueNum = parseInt(assetValue.value.replace(/,/g, '') || '0', 10);
            const taxRate = propertyType.value === 'residential1' ? 0.015 : 0.04;

            const acquisitionTax = Math.floor(assetValueNum * taxRate);
            totalTax = acquisitionTax + additionalCosts;

            document.getElementById('result').innerHTML = `
                <h3>계산 결과</h3>
                <p>취득세: ${acquisitionTax.toLocaleString()} 원</p>
                <p>기타 비용: ${additionalCosts.toLocaleString()} 원</p>
                <p><strong>총 세금: ${totalTax.toLocaleString()} 원</strong></p>
            `;
        } else {
            alert('부동산 종류와 금액을 입력해 주세요.');
        }
    });
});
