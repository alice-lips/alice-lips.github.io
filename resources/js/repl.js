var files = [
  { type: 'f', name: 'README',
    content: 'Thank you for your visit.\nWe have less contents, so please enjoy cats\' photos!!'},
  { type: 'd', name: 'lifegame', link: './enchant-lifegame/' },
  { type: 'd', name: '.allapologies', link: './all-apologies/'}
];

function cd(dir) {
  var f, i;
  if (dir[dir.length-1] === '/') dir = dir.slice(0,dir.length-1);
  for (i=0; i < files.length; ++i) {
    f = files[i];
    if (f.name === dir && f.type === 'd') {
      location.href = f.link;
      return f.name;
    }
  }
  throw new Error('such a dir...');
}

function less(file) {
  var f, i;
  for (i=0; i < files.length; ++i) {
    f = files[i];
    if (f.name===file && f.type==='f') return f.content;
  }
  throw new Error('such a file...');
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
