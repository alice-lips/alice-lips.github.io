var version = "version 0.1.1a";

var files = [
  { type: 'f', name: 'README',
    content: 'Thank you for your visit.\nWe have less contents, so please enjoy cats\' photos!!'},
  { type: 'd', name: 'lifegame', link: './enchant-lifegame/' },
  { type: 'd', name: '.allapologies', link: './all-apologies/'},
  { type: 'd', name: 'catphotos', link: 'http://bit.ly/1tJSagi'}
];

function stat(filename) {
  for (var i=0; i<files.length; ++i) {
    if (files[i].name === filename) return files[i];
  }
  throw new Error('cannot stat such file or directory: ' + filename);
}


function cd(dir) {
  if (dir[dir.length-1] === '/') dir = dir.slice(0,dir.length-1);
  var d = stat(dir);
  if (d.type === 'd' && d.link) {
    location.href = d.link;
    return d.name;
  }
  throw new Error('such a directory...');
}

function less(file) {
  var f = stat(file);
  if (f.type === 'f' && f.content) {
    return f.content;
  }
  throw new Error('such a file...');
}

function date() {
  return (new Date()).toString()
}

function alice_eval(input) {
  var argv = input.split(' ');
  var argc = argv.length;

  switch (argv[0]) {
    case 'ls':
    case 'dir':
      if (argc === 1) {
        return files.filter(function(x){return x.name[0] !== '.'})
          .map(function(x){return x.type==='d'?(x.name+'/'):x.name}).join(' ')
      }
      if (argc === 2 && argv[1] === '-a') {
        return files.map(function(x){return x.type==='d'?(x.name+'/'):x.name}).join(' ')
      }
      if (argc === 2) {
        return stat(argv[1]).name
      }
      throw new Error('such a file or directory...');
    break;

    case 'cd':
      return cd(argv[1]);
    break;

    case 'date': return date();
    break;

    case 'type':
    case 'less':
    case 'more':
    case 'cat':
      return less(argv[1])
    break;
  }
  throw new Error('command not found: ' + argv[0]);
}
