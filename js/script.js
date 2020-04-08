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
const addpost = `{
    "name":"addpost",
    "fields":[
    {
        "label":"Title",
        "input": {
            "type":"text",
            "required": true
        }
    },
    {
        "label":"Description",
        "input": {
            "type":"textarea",
            "required":true
        }
    },
    {
        "label":"Image",
        "input": {
            "type":"file",
            "required": true
        }
    },
    {
        "label":"Publish Date",
        "input": {
            "type": "date",
            "required": true
        }
    },
    {
        "label": "Author",
        "input": {
            "type": "text"
        }
    }
],
"references":[
    {
      "input":{
        "type":"checkbox",
        "required":true,
        "checked":"false"
      }
    },
    {
        "text without ref":"View Author Post",
        "text":"View Author Post",
        "ref":"viewauthor"
    }
  ],
    "buttons":[
    {
        "text":"Create Post"
    }
]
}`

    const signin = '{"name":"login","fields":[{"label":"Enter your login or email","input":{"type":"text","required":true,"placeholder": "login or email"}},{"label":"Enter your password","input":{"type":"password","required":true,"placeholder": "password"}}],"references":[{"text":"Forgot password?","ref":"rememberpassword"},{"text":"Create new account","ref":"signup"}],"buttons":[{"text":"Login"}]}';
    const signup = '{"name":"register","fields":[{"input":{"type":"text","required":true,"placeholder":"Enter full name"}},{"input":{"type":"email","required":true,"placeholder":"Enter email"}},{"input":{"type":"password","required":true,"placeholder":"password"}},{"input":{"type":"password","required":true,"placeholder":"Confirm password"}}],"references":[{"text without ref":"Already have account?","text":"Login","ref":"signin"}],"buttons":[{"text":"Sign Up"}]}';

    var object = JSON.parse(addpost);
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
        case "addpost": 
        name = "ADD POST"
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
         // Проверка на email
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
        // Проверка на textarea
        if (inputType == 'textarea'){
			var textarea = document.createElement('textarea');
            textarea.setAttribute('required', true);
            textarea.className = "container__textarea";
            document.getElementById("container__items"+i).append(textarea);
        }
        // Проверка на file
        if (inputType == 'file') {
            var file = document.createElement('input');
            file.setAttribute('type', 'file');
            document.getElementById("container__items"+i).append(file);
        }
        // Проверка на date
        if (inputType == 'date') {
            var date = document.createElement('input');
            date.setAttribute('type', 'date');
            date.setAttribute('required', true);
            document.getElementById("container__items"+i).append(date);
        }
    
    
    }

    // Блок для references

    if (typeof object.references != "undefined") {
        let references = object.references;
        

        let div = document.createElement('div');
		div.className = "container__ref";
		document.querySelector('.container').appendChild(div);
        for (let [l, v] of references.entries()) {
            let referencesInput = object.references[l].input;
            let textWithoutReferences = object.references[l]["text without ref"];
            if (typeof textWithoutReferences !== "undefined") {
                let text = document.createElement('p');
                text.innerHTML = textWithoutReferences;
                document.querySelector('.container__ref').append(text);
                let link = document.createElement('a');
                link.setAttribute('href', object.references[l].ref);
                link.innerHTML = object.references[l].text;
                document.querySelector('.container__ref').append(link);
                console.log(link);
            } else {
                let link = document.createElement('a');
                link.setAttribute('href', object.references[l].ref);
                link.innerHTML = object.references[l].text;
                document.querySelector('.container__ref').append(link);
            }
            // Проверка на наличие input
            if ( typeof referencesInput !== "undefined") {
                let input = document.createElement('input');
                input.setAttribute('type', 'checkbox');
                input.setAttribute('required', true);
                if (object.references[l].input.checked == 'false') {
                    input.setAttribute('checked', false);
                }
                document.querySelector('.container__ref').append(input);
                
            }
        }
    }

    // BUTTONS
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