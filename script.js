document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.acquisition-btn');
    const fields = {
        realEstate: document.getElementById('realEstateField'),
        vehicle: document.getElementById('vehicleField'),
        other: document.getElementById('otherField'),
    };

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            Object.values(fields).forEach(field => field.style.display = 'none');
            fields[button.dataset.type].style.display = 'block';
        });
    });

    document.getElementById('calculateButton').addEventListener('click', () => {
        const additionalCosts = parseInt(document.getElementById('additionalCosts').value.replace(/,/g, '') || '0', 10);

        let assetValue = 0;
        let taxRate = 0;

        if (fields.realEstate.style.display === 'block') {
            assetValue = parseInt(document.getElementById('realEstateValue').value.replace(/,/g, '') || '0', 10);
            const realEstateType = document.getElementById('realEstateType').value;
            taxRate = realEstateType === 'residential1' ? 0.015 : 0.04;
        } else if (fields.vehicle.style.display === 'block') {
            assetValue = parseInt(document.getElementById('vehiclePrice').value.replace(/,/g, '') || '0', 10);
            const vehicleType = document.getElementById('vehicleType').value;
            taxRate = vehicleType === 'compact' ? 0.05 : 0.07;
        } else if (fields.other.style.display === 'block') {
            assetValue = parseInt(document.getElementById('otherAssetValue').value.replace(/,/g, '') || '0', 10);
            taxRate = 0.03;
        }

        const acquisitionTax = Math.floor(assetValue * taxRate);
        const totalTax = acquisitionTax + additionalCosts;

        document.getElementById('result').innerHTML = `
            <h3>계산 결과</h3>
            <p>취득세: ${acquisitionTax.toLocaleString()} 원</p>
            <p>기타 비용: ${additionalCosts.toLocaleString()} 원</p>
            <p><strong>총 세금: ${totalTax.toLocaleString()} 원</strong></p>
        `;
    });
});
