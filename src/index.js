module.exports = function check(str, ...bracketsConfig) {
  // your solution
  // стэк для определения порядка следования скобок
  let stack = [];

  // спец стек для определия последовательности каогда откр и закр скобки одинаковы как ||
  let spec_stack = []
  // словарь для видов скобок
  let bracket_pair = {};

  // массив видов открывающих скобок
  let open_bracket = [];
  // массив видов закрывающих скобок чтобы можно было определить когда откр и закр скобки одинаковы как ||
  let close_bracket = [];

  for (i = 0; i < bracketsConfig.length; i++) {
    for (j = 0; j < bracketsConfig[i].length; j++) {
      // заполняем словарь видов скобок
      bracket_pair[`${bracketsConfig[i][j][1]}`] = `${bracketsConfig[i][j][0]}`;
      // заполняем массив видов открывающих скобок
      open_bracket.push(bracketsConfig[i][j][0]);
      close_bracket.push(bracketsConfig[i][j][1]);

      // console.log('===========');
      // console.log(bracket_pair);
      // console.log('===========');
    }
  }

  for (let i = 0; i < str.length; i++) {
    // текущий элемент 
    let curr_el = str[i];


    // if (open_bracket.includes(curr_el) && (close_bracket.includes(curr_el)) &&
    //   ((spec_stack.length % 2 !== 0)) || (spec_stack.length == 0)) {
    //   spec_stack.push(curr_el);
    // }

    // текущий элемент - открывающая скобка  && ((spec_stack.length % 2 !== 0)) || (spec_stack.length == 0)) 
    if (open_bracket.includes(curr_el)) {
      // а также если текущий элемент - закрывающая  скобка т.е. ||
      // if (close_bracket.includes(curr_el) && (stack.length === 0)) {
      //   spec_stack.push(curr_el);
      // }


      // если стек еще не содержит скобки которая явл и закр и откр одновременно как скобки "или"|| 
      // если уже содержит такую скобку - значит текущая скобка явл закрывающей надо перейти к шагу с закр скобками
      if (!stack.includes(curr_el) && open_bracket.includes(curr_el) && close_bracket.includes(curr_el)) {
        stack.push(curr_el);
        continue;
      } else {
        // если тек эл не закр скобка то
        if (!close_bracket.includes(curr_el)) {
          // заносим в стек скобку не явл одинаковой 
          stack.push(curr_el);
          continue;
        }
      }



      //   if ((close_bracket.includes(str[i + 1]) && (!open_bracket.includes(str[i + 1])) && (i !== (str.length - 1)))) {
      //     console.log('\n стрsdsdsdока: ' + str);
      //     console.log(false);
      //     return false;

      //   } else {
      //     spec_stack.push(curr_el);
      //   }
      // }


    }

    // если тек эл закрывающая скобка:
    // else {
    if (close_bracket.includes(curr_el)) {
      // если текущий эл не открыв скобка и стэк пуст значит ошибка
      if (stack.length === 0) {
        console.log('\n строка: ' + str);
        console.log(false);
        return false;
      }

      // последний элемент в стэке
      let top_el_stack = stack[stack.length - 1];


      // если элемент не открыв скобка и стэк не пуст значит найти парную скобку
      // используем словарь пар для скобок и последний элемент в стэке сравниваем
      if (bracket_pair[curr_el] === top_el_stack) {
        // если наш тек эл == посл эл в стэке - значит пара совпала скобка закрыта
        // нужно удалить этот последний элемент из стека

        // if (close_bracket.includes(curr_el) && open_bracket.includes(curr_el) &&
        //   (spec_stack.length > 1) && (i !== (str.length - 1)) && (str[i + 1] !== curr_el)) {
        //   console.log('\n sddsdsdsds   строка: ' + str);
        //   console.log(false);
        //   return false;
        // }
        // if ((close_bracket.includes(curr_el)) && (spec_stack.length % 2 == 0)) {
        //   if (i < str.length - 1) {
        //     if (close_bracket.includes(str[i + 1]) && !open_bracket.includes(str[i + 1])) {
        //       console.log('\n i < str.length-1 строка: ' + str);
        //       console.log(false);
        //       return false;
        //     }
        //   }

        //   spec_stack.pop();
        // }


        stack.pop();

      } else {

        console.log('\n строка: ' + str);
        console.log('текущая скобка: ' + curr_el + 'индекс: ' + i);
        console.log('верхний элемент стека: ' + top_el_stack);
        console.log(false);
        return false;
      }
    }
  }




  console.log('\n строка: ' + str);
  console.log('\n словарь для видов скобок: ');
  console.log(bracket_pair);
  console.log('=---------------=');
  console.log('массив видов открывающих скобок: ');
  console.log(open_bracket);
  console.log('=---------------=');
  console.log('spec_stack.length: ' + spec_stack.length);

  console.log(((stack.length === 0)));
  return ((stack.length === 0));
}



// check('()', [['(', ')']]); // -> true
// check('((()))()', [['(', ')']]); // -> true
// check('())(', [['(', ')']]); // -> false
// check('([{}])', [['(', ')'], ['[', ']'], ['{', '}']]); // -> true
// check('[(])', [['(', ')'], ['[', ']']]); // -> false
// check('[]()', [['(', ')'], ['[', ']']]); // -> true
// check('[]()(', [['(', ')'], ['[', ']']]); // -> false

// // special case: opening and closing bracket can be the same :)

// check('||', [['|', '|']]); // -> true
// check('|()|', [['(', ')'], ['|', '|']]); // -> true
// check('|(|)', [['(', ')'], ['|', '|']]); // -> false
// check('|()|(||)||', [['(', ')'], ['|', '|']]); // -> true