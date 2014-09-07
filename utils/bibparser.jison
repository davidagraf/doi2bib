/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[^@{},=]+                         return 'TEXT'
"@"                               return '@'
"{"                               return '{'
"}"                               return '}'
","                               return ','
"="                               return '='

/lex

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
          };
        }
    ;

tags
    : tags ',' TEXT '=' '{' taglist '}'
        {
          if ($6.length === 1) {
            $1[$3.trim()] = $6[0];
          } else {
            $1[$3.trim()] = $6;
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
          $$ = {};
        }
    ;

taglist
    : taglist ',' tagvalue
        {
          $$ = $1;
          $$.push($3);
        }
    | tagvalue
        {
          $$ = [$1];
        }
    ;

tagvalue
    : TEXT  '{' tagvalue '}' tagvalue
        {
          $$ = [$1, $2, $3, $4, $5].join('');
        }
    | '{' tagvalue '}' tagvalue
        {
          $$ = [$1, $2, $3, $4].join('');
        }
    | TEXT
        {
          $$ = $1;
        }
    |
        {
          $$ = '';
        }
    ;
