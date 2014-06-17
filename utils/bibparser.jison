/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
([^\\@{},=]|\\.(\{[a-zA-Z]+\})?)+ return 'TEXT'
"@"                               return '@'
"{"                               return '{'
"}"                               return '}'
","                               return ','
"="                               return '='

/lex

/* operator associations and precedence */

/*
%left '+' '-'
%left '*' '/'
%left '^'
%left UMINUS
*/

%start expressions

%% /* language grammar */

expressions
    : bibtex
        {return $1;}
    | bibtex EOF
        {return $1;}
    ;

bibtex
    : '@' TEXT '{' TEXT tags '}'
        {
          $$ = {
            type: $2,
            id: $4,
            tags: $5
          }
        }
    ;

tags
    : tags ',' TEXT '=' '{' taglist '}'
        {
          if ($6.length === 1) {
            $1[$3] = $6[0];
          } else {
            $1[$3] = $6;
          }
          $$ = $1;
        }
    | tags ',' TEXT '=' TEXT
        {
          $1[$3] = $5;
          $$ = $1;
        }
    |
        {
          $$ = {}
        }
    ;

taglist
    : taglist ',' TEXT
        {
          $$ = $1;
          $$.push($3);
        }
    | TEXT
        {
          $$ = [$1]
        }
    ;
