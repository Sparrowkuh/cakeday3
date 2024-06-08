document.addEventListener('DOMContentLoaded', function() {
    const reservationButton = document.getElementById('reservationButton');
    const popup = document.getElementById('popup');
    const agreeButton = document.getElementById('agreeButton');
    const disagreeButton = document.getElementById('disagreeButton');
    const confirmRegionButton = document.getElementById('confirmRegion');
    const detailsSection = document.getElementById('details');
    const planPopup = document.getElementById('planPopup');
    const planPopupContent = document.getElementById('planPopupContent');
    const closePlanPopup = document.getElementById('closePlanPopup');
    const locationSelection = document.getElementById('locationSelection');

    if (reservationButton) {
        reservationButton.addEventListener('click', function() {
            popup.style.display = 'flex';
        });
    }

    if (agreeButton) {
        agreeButton.addEventListener('click', function() {
            popup.style.display = 'none';
            window.location.href = 'reservation.html';
        });
    }

    if (disagreeButton) {
        disagreeButton.addEventListener('click', function() {
            popup.style.display = 'none';
        });
    }

    if (confirmRegionButton) {
        confirmRegionButton.addEventListener('click', function() {
            const subRegion = document.getElementById('subRegion').value;
            const proRegions = ['gangnam', 'songpa', 'seocho', 'seongdong']; // Pro regions

            locationSelection.style.display = 'none';
            detailsSection.style.display = 'block';

            let planMessage = '';
            let planPrice = '';

            if (proRegions.includes(subRegion)) {
                planMessage = 'Pro 플랜이 자동 적용되었습니다.';
                planPrice = '월 29900원';
            } else {
                planMessage = 'Basic 플랜이 자동 적용되었습니다.';
                planPrice = '월 19900원';
            }

            planPopupContent.insertAdjacentHTML('afterbegin', `<p>${planMessage} (${planPrice})</p>`);
            planPopup.style.display = 'flex';
        });
    }

    if (closePlanPopup) {
        closePlanPopup.addEventListener('click', function() {
            planPopup.style.display = 'none';
        });
    }

    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const location = document.getElementById('location').value;
            const time = document.getElementById('time').value;
            const locker = document.getElementById('locker').value;
            const customerName = document.getElementById('customerName').value;
            const customerPhone = document.getElementById('customerPhone').value;
            const password = document.getElementById('password').value;

            // Check if all fields are filled
            if (!location || !time || !locker || !customerName || !customerPhone || !password) {
                alert('모든 필드를 작성해주세요.');
                return;
            }

            // Validate the time input
            const timeInput = document.getElementById('time');
            const minTime = "09:00";
            const maxTime = "18:00";
            const timeValue = time.split('T')[1];

            if (timeValue < minTime || timeValue > maxTime) {
                alert(`영업 시간은 ${minTime} ~ ${maxTime} 입니다.`);
                return;
            }

            const confirmationDetails = `
                <p><strong>위치:</strong> ${location}</p>
                <p><strong>시간:</strong> ${time}</p>
                <p><strong>사물함 번호:</strong> ${locker}</p>
                <p><strong>고객 성함:</strong> ${customerName}</p>
                <p><strong>고객 전화번호:</strong> ${customerPhone}</p>
            `;

            document.getElementById('reservationDetails').innerHTML = confirmationDetails;
            showBottomSheet();
        });

        const timeInput = document.getElementById('time');
        const minTime = "09:00";
        const maxTime = "18:00";

        timeInput.addEventListener('input', function() {
            const timeValue = timeInput.value.split('T')[1];
            if (timeValue < minTime || timeValue > maxTime) {
                timeInput.setCustomValidity(`영업 시간은 ${minTime} ~ ${maxTime} 입니다.`);
            } else {
                timeInput.setCustomValidity('');
            }
        });
    }

    const upgradeButton = document.getElementById('upgradeButton');
    if (upgradeButton) {
        upgradeButton.addEventListener('click', function() {
            alert('Pro 플랜으로 업그레이드되었습니다!');
        });
    }

    const modal = document.getElementById('reservationConfirmationModal');
    const closeBtn = document.getElementById('closeReservationModal');
    const confirmBtn = document.getElementById('confirmReservation');
    const backBtn = document.getElementById('backToReservation');

    function showBottomSheet() {
        modal.style.display = 'block';
    }

    function hideBottomSheet() {
        modal.style.display = 'none';
    }

    closeBtn.addEventListener('click', hideBottomSheet);
    backBtn.addEventListener('click', hideBottomSheet);
    confirmBtn.addEventListener('click', function() {
        hideBottomSheet();
        alert('예약이 확인되었습니다.');
    });

    window.onclick = function(event) {
        if (event.target == modal) {
            hideBottomSheet();
        }
    };
});
