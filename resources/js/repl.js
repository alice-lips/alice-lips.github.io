function newFile(type, name, option) {
  var ret = {type: type, name: name};
  if (type === 'f' && option.content) ret.content = option.content;
  if (type === 'd' && option.link) ret.link = option.link;
  return ret;
};

var files = [
  newFile('f', 'README', {content: 'Thank you for your visit.\nWe have less contents, so please enjoy cats\' photos!!\n=> @http://is.gd/GeaywE'}),
  newFile('d', 'lifegame', {link: './enchant-lifegame/'}),
  newFile('d', '.all-apologies', {link: './all-apologies/'}),
];

function cd(dir) {
  if (dir[dir.length-1] === '/') dir = dir.slice(0,dir.length-1);

  var ret;
  files.forEach(function(f) {
    if (f.name === dir && f.type === 'd') location.href = f.link, ret = f.name;
  });
  if (ret) return ret;
  throw new Error('such a dir...');
}

function less(file) {
  var ret;
  files.forEach(function(f) {
    if (f.name===file && f.type==='f') ret = f.content;
  });
  if (ret) return ret;
  throw new Error('such a file...');
}

function alice_eval(input) {
  input = input.trim();
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
    break;

    case 'cd':
      return cd(argv[1]);
    break;

    case 'type':
    case 'less':
    case 'more':
    case 'cat':
    case 'vi':
    case 'vim':
      return less(argv[1])
    break;
  }
  throw new Error('unknown command');
}
