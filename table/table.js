var content = {
    heading: 'My Collegues',
    table: [
        {'ID': 2, 'First Name': 'Martin', 'Last Name': 'Chaov', 'Occupation': 'Designer'},
        {'ID': 6, 'First Name': 'Lyubomir', 'Last Name': 'Todorov', 'Occupation': 'Front-end developer'},
        {'ID': 1, 'First Name': 'Daniela', 'Last Name': 'Popova', 'Occupation': 'Front-end developer'},
        {'ID': 4, 'First Name': 'Tzvetana', 'Last Name': 'Zlatareva', 'Occupation': 'Designer'},
        {'ID': 11, 'First Name': 'Galina', 'Last Name': 'Georgieva', 'Occupation': 'C# .NET developer'},
        {'ID': 3, 'First Name': 'Maya', 'Last Name': 'Petkova', 'Occupation': 'Front-end developer'},
        {'ID': 12, 'First Name': 'Panaoyt', 'Last Name': 'Popov', 'Occupation': 'C# .NET developer'},
        {'ID': 7, 'First Name': 'Viktor', 'Last Name': 'Mitev', 'Occupation': 'C# .NET developer'},
        {'ID': 13, 'First Name': 'Gancho', 'Last Name': 'Angelov', 'Occupation': 'Front-end developer'},
        {'ID': 9, 'First Name': 'Gabriel', 'Last Name': 'Kunchev', 'Occupation': 'Front-end developer'},
        {'ID': 10, 'First Name': 'Petko', 'Last Name': 'Petkov', 'Occupation': 'C# .NET developer'},
        {'ID': 8, 'First Name': 'Dobri', 'Last Name': 'Ugrenov', 'Occupation': 'Marketing'},
        {'ID': 14, 'First Name': 'Stanislav', 'Last Name': 'Kumanov', 'Occupation': 'Front-end developer'},
        {'ID': 15, 'First Name': 'Marin', 'Last Name': 'Dimitrov', 'Occupation': 'Team Leader', 'size': 1},
        {'ID': 16, 'First Name': 'Ivan', 'Last Name': 'Atanasov', 'Occupation': 'Team Leader'},
        {'ID': 17, 'First Name': 'Stoil', 'Last Name': 'Pankov', 'Occupation': 'Team Leader'},
        {'ID': 18, 'First Name': 'Elina', 'Last Name': 'Basheva', 'Occupation': 'Team Leader'},
        {'ID': 19, 'First Name': 'Nicole', 'Last Name': 'Kalcheva', 'Occupation': 'Product manager'},
        {'ID': 20, 'First Name': 'Desislava', 'Last Name': 'Savova', 'Occupation': 'Project manager'},
        {'ID': 21, 'First Name': 'Rosica', 'Last Name': 'Dencheva', 'Occupation': 'Account manager'},
        {'ID': 22, 'First Name': 'Boian', 'Last Name': 'Botev', 'Occupation': 'Team Leader'},
        {'ID': 23, 'First Name': 'Diana', 'Last Name': 'Karcheva', 'Occupation': 'C# .Net developer'},
        {'ID': 24, 'First Name': 'Miroslav', 'Last Name': 'Uzunov', 'Occupation': 'DBA'},
        {'ID': 25, 'First Name': 'Ivan', 'Last Name': 'Tsatsarov', 'Occupation': 'DBA'}
    ]
};

var Table = function(content) {
    this.rows = content.table;

    this.getCols = function() {
        var uniqCols = {},
            colsList = [];

        this.rows.forEach(function(item) {
            for (var prop in item) {
                if (item.hasOwnProperty(prop)) {
                    uniqCols[prop] = true;
                }
            }
        });

        for (var col in uniqCols) {
            if (uniqCols.hasOwnProperty(col)) {
                colsList.push(col);
            }
        }

        return this.cols = colsList;
    };

    this.renderTable = function() {
        var __self = this;
        var table = document.createElement('table');

        // making caption
        var caption = document.createElement('caption');
        caption.innerText = content.heading;
        table.appendChild(caption);

        //making header
        var header = document.createElement('tr');
        this.cols.forEach(function (col) {
            var thElem = document.createElement('th');

            thElem.innerText = col;

            header.appendChild(thElem);
        });
        table.appendChild(header);


        // making rows with data
        this.rows.forEach(function(row) {
            var rowElem = document.createElement('tr');

            __self.cols.forEach(function(col) {
                var tdElem = document.createElement('td');
                tdElem.innerText = row[col] || '–';

                rowElem.appendChild(tdElem);
            });

            table.appendChild(rowElem);
        });

        document.body.appendChild(table);
    };

    this.init = function() {
        this.getCols();
        this.renderTable();
    };

    this.init();
};

window.onload = function() {
    var table = new Table(content);
};
