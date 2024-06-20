        document.addEventListener("DOMContentLoaded", function () {
            var table = document.getElementById('personnelTable');
            var tbody = table.getElementsByTagName('tbody')[0];
            var headers = table.getElementsByTagName('th');

            // جستجو در هر ستون
            Array.from(document.getElementsByClassName('search-input')).forEach(function (input, index) {
                input.addEventListener('keyup', function () {
                    var searchValue = this.value.toLowerCase();
                    Array.from(tbody.rows).forEach(function (row) {
                        var cellText = row.cells[index].textContent.toLowerCase();
                        row.style.display = cellText.includes(searchValue) ? '' : 'none';
                    });
                });
            });

            // مرتب‌سازی بر اساس هر ستون
            Array.from(headers).forEach(function (header, index) {
                if (index < headers.length - 1) { // برای جلوگیری از مرتب‌سازی ستون عملیات
                    header.addEventListener('click', function () {
                        var sortDirection = header.dataset.sortDirection === 'asc' ? 'desc' : 'asc';
                        header.dataset.sortDirection = sortDirection;

                        // حذف کلاس های آیکن های دیگر
                        Array.from(headers).forEach(function (h) {
                            var sortIcon = h.querySelector('.sort-icon');
                            if (sortIcon && h !== header) {
                                sortIcon.textContent = '⇅';
                            }
                        });

                        // تغییر آیکن مرتب‌سازی
                        var sortIcon = header.querySelector('.sort-icon');
                        if (sortIcon) {
                            sortIcon.textContent = sortDirection === 'asc' ? '↑' : '↓';
                        }

                        var rowsArray = Array.from(tbody.rows);
                        rowsArray.sort(function (a, b) {
                            var aText = a.cells[index].textContent;
                            var bText = b.cells[index].textContent;
                            return sortDirection === 'asc' ? aText.localeCompare(bText) : bText.localeCompare(aText);
                        });
                        rowsArray.forEach(function (row) {
                            tbody.appendChild(row);
                        });
                    });
                }
            });

            // رویداد برای دکمه حذف
            tbody.addEventListener('click', function (event) {
                if (event.target.classList.contains('delete-btn')) {
                    event.target.closest('tr').remove();
                }
            });
        });