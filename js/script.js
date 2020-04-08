document.addEventListener("DOMContentLoaded", () => {

    const colorscheme =
        `{"name":"website_color_scheme",
    "fields":[{"label":"Choose color scheme",
    "input":{   
        "type":"color",
        "colors":["#3366ff","#009933","#990033","#996633"]
    }
},
{
    "input":{
        "type":"checkbox",
        "checked":"false"
    },
    "label":"Turn on dark theme?"
}
]
}`;

    const signin = '{"name":"login","fields":[{"label":"Enter your login or email","input":{"type":"text","required":true,"placeholder": "login or email"}},{"label":"Enter your password","input":{"type":"password","required":true,"placeholder": "password"}}],"references":[{"text":"Forgot password?","ref":"rememberpassword"},{"text":"Create new account","ref":"signup"}],"buttons":[{"text":"Login"}]}';
    const signup = '{"name":"register","fields":[{"input":{"type":"text","required":true,"placeholder":"Enter full name"}},{"input":{"type":"email","required":true,"placeholder":"Enter email"}},{"input":{"type":"password","required":true,"placeholder":"password"}},{"input":{"type":"password","required":true,"placeholder":"Confirm password"}}],"references":[{"text without ref":"Already have account?","text":"Login","ref":"signin"}],"buttons":[{"text":"Sign Up"}]}';

    var object = JSON.parse(colorscheme);
    var name;

    switch (object.name) {
        case "website_color_scheme":
            name = object.name.split('_').join(' ').toUpperCase();
            break;
        case "register":
            name = object.name.split('_').join(' ').toUpperCase();
            break;
        case "login":
            name = object.name.split('_').join(' ').toUpperCase();
            break;
    }




    var header = document.createElement('h3');
    header.innerHTML = name;
    document.querySelector('.container').append(header);

    var fields = object.fields;
    for (const [i, v] of fields.entries()) {
        let div = document.createElement('div');
		div.className = "container__items";
		div.id = "container__items"+ i;
		document.querySelector('.container').append(div);

        // LABEL
        var labelText = object.fields[i].label;
        if (typeof labelText != "undefined") {
            var label = document.createElement('LABEL');
            label.innerHTML = labelText;
            document.getElementById("container__items"+i).append(label);
        }

        // INPUTS
        var inputType = object.fields[i].input.type;
        if (inputType == 'color') {

            var input = document.createElement('input');
            input.setAttribute('class', 'color');
            input.setAttribute('type', 'color');
            input.setAttribute('list', 'colors');
            document.getElementById("container__items"+i).append(input);

            var datalist = document.createElement('datalist');
            datalist.setAttribute('id', 'colors');
            document.getElementById("container__items"+i).append(datalist);
            // datalis colors
            var inputColors = object.fields[i].input.colors;
            for (let [j, v] of inputColors.entries()) {
                var option = document.createElement('option');
                var colors = object.fields[i].input.colors[j];
                option.setAttribute('value', colors);
                document.getElementById('colors').append(option);
            }
        }
        // Проверка на checkbox
        if (inputType == 'checkbox') {
            var input = document.createElement('input');
            input.setAttribute('type', 'checkbox');
            if (object.fields[i].input.checked == 'false') {
                input.setAttribute('checked', false);
            }
            document.getElementById("container__items"+i).append(input);
        }

        // Проверка на text
        if (inputType == "text") {
            var input = document.createElement('input');
            input.setAttribute('type', 'text');
            if (object.fields[i].input.required == 'true') {
                input.setAttribute('required', true);
            }
            if (object.fields[i].input.placeholder != 'undefined') {
                input.setAttribute('placeholder', object.fields[i].input.placeholder);
            }
            document.getElementById("container__items"+i).append(input);
        }
        // Проверка на password
        if (inputType == "password") {
            let input = document.createElement('input');
            input.setAttribute('type', 'password');
            if (object.fields[i].input.required == 'true') {
                input.setAttribute('required', true);
            }
            if (object.fields[i].input.placeholder != 'undefined') {
                input.setAttribute('placeholder', object.fields[i].input.placeholder);
            }
            document.getElementById("container__items"+i).append(input);
        }
        if (inputType == 'email'){
			var input = document.createElement('input');
			input.setAttribute('type','email');
            if (object.fields[i].input.required == 'true') {
                input.setAttribute('required', true);
            }
            if (object.fields[i].input.placeholder != 'undefined') {
                input.setAttribute('placeholder', object.fields[i].input.placeholder);
            }

            document.getElementById("container__items"+i).append(input);
		}

    }

    // Блок для references

    if (typeof object.references != "undefined") {
        let references = object.references;

        let div = document.createElement('div');
		div.className = "container__ref";
		document.querySelector('.container').appendChild(div);
        for (let [l, v] of references.entries()) {
            let textWithoutReferences = object.references[l]["text without ref"];
            if (typeof textWithoutReferences !== "undefined") {
                let text = document.createElement('p');
                text.innerHTML = textWithoutReferences;
                document.querySelector('.container__ref').append(text);
                let link = document.createElement('a');
                link.setAttribute('href', object.references[l].ref);
                link.innerHTML = object.references[l].text;
                document.querySelector('.container__ref').append(link);
            } else {
                let link = document.createElement('a');
                link.setAttribute('href', object.references[l].ref);
                link.innerHTML = object.references[l].text;
                document.querySelector('.container__ref').append(link);
            }
        }
    }

    if (typeof object.buttons != "undefined") {
        let div = document.createElement('div');
		div.className = "container__button";
		document.querySelector('.container').append(div);

        let buttons = object.buttons;
        for (let [q, v] of buttons.entries()) {
            let btn = document.createElement('button');
            btn.innerHTML = object.buttons[q].text;
            document.querySelector('.container__button').append(btn);
        }
    }














});