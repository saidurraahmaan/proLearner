const languages = [
    {
        id:'1',
        title: "C",
        description: "C is a structured programming language developed by Dennis Ritchie in 1973 at Bell Laboratories. It is one of the most popular computer languages today because of its structure, high-level abstraction, machine independent feature"
    },
    {
        id:'2',
        title: "C++",
        description: "C++ is a popular programming language. C++ is used to create computer programs."
    },
    {
        id:'3',
        title: "C#",
        description: "C# is a popular programming language. C# is used to create computer programs."
    },
    {
        id:'4',
        title:"Python",
        description: "python is a dash dash bla bla."
    }
]

const id = languages.filter(item=>item.title==='C');

console.log(id);